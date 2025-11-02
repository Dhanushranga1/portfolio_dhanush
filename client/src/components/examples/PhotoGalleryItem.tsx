import PhotoGalleryItem from '../PhotoGalleryItem'
import photoImage from '@assets/generated_images/Nature_photo_one_c2ff85be.png'

export default function PhotoGalleryItemExample() {
  return (
    <div className="max-w-sm">
      <PhotoGalleryItem
        src={photoImage}
        alt="Beautiful sunset landscape"
        aspectRatio="portrait"
      />
    </div>
  )
}
