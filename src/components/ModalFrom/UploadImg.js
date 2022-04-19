import React, { useState } from 'react'
import styled from 'styled-components'
import { path } from '../../utils/app'

const Styles = styled.div`
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 25px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  overflow: hidden;
  .fileInput {
    position: absolute;
    width: 100%;
    height: 100%;
    cursor: pointer;
    opacity: 0;
  }
  .imgPreview {
    max-width: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 220px;
    img {
      width: auto;
      height: 100%;
    }
  }
`

const UploadImg = (props) => {

    const [image, setImage] = useState('')

    const handleImageChange = (e) => {
        e.preventDefault()

        let reader = new FileReader()
        let file = e.target.files[0]

        if (file) {
            reader.onloadend = () => {
                setImage(reader.result)
                props.handleSetImage(reader.result)
            }

            reader.readAsDataURL(file)
        }
    }

    let imagePreview
    if (image.length) {
        imagePreview = (<img src={image} alt="img" />)
    } else if (props.initialImage) {
        imagePreview = (<img src={`${props.initialImage}?${+ new Date().getTime()}`} alt="img" />)
    } else {
        imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    }

    return (
        <Styles>
            <input className="fileInput"
                type="file"
                onChange={handleImageChange} />
            <div className="imgPreview">
                {imagePreview}
            </div>
        </Styles>
    )
}

export default UploadImg
