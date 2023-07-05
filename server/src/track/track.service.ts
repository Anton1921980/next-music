import { FileService, FileType } from '../file/file.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Track, TrackDocument } from './schemas/track.schema';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateTrackDto } from './dto/create-track.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { Playlist, PlaylistDocument } from './schemas/playlist.schema';

@Injectable()
export class TrackService {
  constructor(
    @InjectModel(Track.name) private trackModel: Model<TrackDocument>,
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Playlist.name) private playlistModel: Model<PlaylistDocument>,
    private fileService: FileService,
  ) {}
  async create(dto: CreateTrackDto, picture, audio): Promise<Track> {
    const audioPath = await this.fileService.createFile(FileType.AUDIO, audio);
    const picturePath = await this.fileService.createFile(
      FileType.IMAGE,
      picture,
    );
    const track = await this.trackModel.create({
      ...dto,
      listens: 0,
      audio: audioPath,
      picture: picturePath,
    });
    return track;
  }

  async getAll(count = 10, offset = 0, playlist: string): Promise<Track[]> {
    let query = {};
    console.log('playlist: ', playlist, typeof playlist);
    if (playlist == '') {
      query = {};
    } else if (playlist?.includes('s=')) {
      query = { playlists: { $ne: playlist.substring(2) } };
    } else {
      query = { playlists: playlist };
    }
    console.log('query: ', query);
    const tracks = await this.trackModel.find(query).skip(offset).limit(count);
    console.log('tracks: ', tracks);
    return tracks;
  }

  async getOne(id: ObjectId): Promise<Track> {
    const track = await this.trackModel.findById(id).populate('comments');
    return track;
  }

  async delete(id: ObjectId): Promise<ObjectId> {
    const track = await this.trackModel.findByIdAndDelete(id);
    return track._id;
  }
  async addComment(dto: CreateCommentDto): Promise<Comment> {
    const track = await this.trackModel.findById(dto.trackId);
    const comment = await this.commentModel.create({ ...dto });
    track.comments.push(comment._id); //await
    await track.save();
    return comment;
  }
  async edit(id: ObjectId, playlist: string): Promise<Track> {
    const track = await this.trackModel.findById(id);
    const index = track.playlists.indexOf(playlist);
    if (index !== -1) {
      track.playlists.splice(index, 1);
    } else {
      track.playlists.push(playlist);
    }
    await track.save();
    return track;
  }
  async addPlaylist(dto: CreatePlaylistDto): Promise<Playlist> {
    const playlist = await this.playlistModel.create({ ...dto });
    return playlist;
  }
  async getAllPlaylists(count = 20, offset = 0): Promise<Playlist[]> {
    const playlists = await this.playlistModel.find().skip(offset).limit(count);
    return playlists;
  }
  async listen(id: ObjectId) {
    const track = await this.trackModel.findById(id);
    track.listens += 1;
    await track.save();
  }
  async search(query: string): Promise<Track[]> {
    const tracks = await this.trackModel.find({
      name: { $regex: new RegExp(query, 'i') },
    });
    return tracks;
  }
}
