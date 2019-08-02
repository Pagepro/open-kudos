import { Dropbox } from 'dropbox'
import fetch from 'isomorphic-fetch'
import uuidv4 from 'uuid/v4'
import { IFile } from '../../controllers/giftsController/models'
import CommonConst from '../consts/common'
import LoggerService from './logger'

export default class ImagesService {
  private logger = new LoggerService()
  private dropbox = new Dropbox({
    accessToken: process.env.DROPBOX_TOKEN, fetch
  })

  public async saveImage(teamId: string, image: IFile): Promise<string> {
    if (image) {
      try {
        const [_, imageExtension] = image.mimetype.split('/')
        const imageName = uuidv4()
        const imagePath = `/${teamId}/${imageName}.${imageExtension}`

        await this.dropbox.filesUpload({
          autorename: true,
          contents: image.buffer,
          path: imagePath
        })

        const sharedLinkResponse =
          await this.dropbox.sharingCreateSharedLink({ path: imagePath })

        const imageLinkThatCanByUsedInSrcTag = `${sharedLinkResponse.url}&raw=1`

        return imageLinkThatCanByUsedInSrcTag
      } catch (error) {
        this.logger.logError(error)
      }
    }

    return CommonConst.defaultImageSrc
  }
}
