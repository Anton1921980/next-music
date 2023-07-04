import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlaylistDocument = Playlist & Document;

@Schema()
export class Playlist {
  @Prop()
  name!: string;
}

export const PlaylistSchema = SchemaFactory.createForClass(Playlist);
