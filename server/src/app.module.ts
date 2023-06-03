import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrackModule } from './track/track.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TrackModule,
    MongooseModule.forRoot(
      'mongodb+srv://mywear1:w20YA4JNE4PTHmnv@cluster0.wliwu6q.mongodb.net/?retryWrites=true&w=majority',
    ),
  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
