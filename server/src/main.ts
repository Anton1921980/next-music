import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as path from 'path';
import * as fs from 'fs-extra';

async function start() {
  try {
    //copy music to dist folder cause server restarting removes it 
    const filePath = path.resolve(__dirname, '..', 'static');
    fs.mkdirSync(filePath, { recursive: true });
    fs.copy('./static', './dist/static', function (err) {
      if (err) {
        console.error(err);
      } else {
        console.log(
          "Success! The 'static' folder has been copied to 'dist/static'.",
        );
      }
    });

    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(PORT, () => console.log('server started on Port: ', PORT));
  } catch (e) {
    console.log(e);
  }
}
start();
