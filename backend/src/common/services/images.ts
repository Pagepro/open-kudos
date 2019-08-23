import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'
import jimp from 'jimp'
import uuidv4 from 'uuid/v4'
import { IFile } from '../../controllers/giftsController/models'
import Config from '../consts/config'
import LoggerService from './logger'

export default class ImagesService {
  private logger = new LoggerService()
  private dropbox = new Dropbox({
    accessToken: Config.dropboxToken, fetch
  })

  public async saveImage(teamId: string, image: IFile): Promise<string> {
    if (!image) {
      return String.empty
    }

    try {
      const { mimetype, buffer } = image
      const [_, imageExtension] = mimetype.split('/')
      const imageName = uuidv4()
      const imagePath = `/${teamId}/${imageName}.${imageExtension}`
      const imageToResize = await jimp.read(buffer)
      const imageBuffer: Buffer = await this.ResizeImage(imageToResize, image)

      await this.dropbox.filesUpload({
        autorename: true,
        contents: imageBuffer,
        path: imagePath
      })

      const sharedLinkResponse =
        await this.dropbox.sharingCreateSharedLink({ path: imagePath })

      const imageLink = `${sharedLinkResponse.url}&raw=1`

      return imageLink
    } catch (error) {
      this.logger.logError(error)
    }

    return String.empty
  }

  private async ResizeImage(imageToResize: jimp, image: IFile) {
    let imageBuffer: Buffer = null

    await imageToResize
      .resize(jimp.AUTO, 256)
      .getBuffer(image.mimetype, (error, Buff) => {
        if (error) {
          this.logger.logError(error.message)
        }

        imageBuffer = Buff
      })

    return imageBuffer
  }
}
