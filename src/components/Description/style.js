import styled from 'styled-components'
import { backgroundSuggestedBox, borderSuggestedBox } from '../../utils/colors'

export const SuggestionDescStyles = styled.div`
    .item-wrapper {
        padding: 25px;
    }
    .suggested-wrapper {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        margin-top: 50px;
        .suggested-box {
            position: relative;
            max-width: 440px;
            width: 100%;
            background: ${backgroundSuggestedBox};
            border-radius: 4px;
            border: 1px solid ${borderSuggestedBox};
            margin-bottom: 25px;
            padding: 35px 15px;
            .match {
                position: absolute;
                right: 15px;
                top: 15px;
                font-size: 22px;
                font-weight: bold;
            }
            .image {
                display: block;
                margin: 0 auto;
                height: 280px;
                width: 280px;
                text-align: center;
                .img {
                    max-width: 100%;
                    max-height:280px;
                }
            }
            .title {
                margin-top: 10px;
                text-align: center;
                height: 40px;
                font-size: 14px;
                font-weight: bold;
            }
            .ean {
                font-weight: bold;
                text-align: center;
                margin: 10px;
            }
            .resolve-btn {
                text-align: center;]
            }
            .product-param {
                text-align: center;
                border-radius: 4px;
                border: solid 1px #3b4799;
                background-color: #f8f9fe;
                div {
                    margin-bottom: 10px;
                    span {
                        font-weight: bold;
                        color: #3b4799;
                    }
                }
            }

            .resolve-btn {
                margin: 0 auto;
                display: block;
            }
        }
    }
`

export const CoreProductDescStyles = styled.div`
    .item-wrapper {
        padding: 25px;
        .item-info {
            margin-top: 15px;
            font-size: 16px;
            font-weight: bold;
            span {
                font-weight: normal;
            }
        }
    }
    .loader {
        margin-top: 10px;
    }
    .resolve-box {
        margin-top: 25px;
    }
    .core-image {
        max-height: 280px;
        max-width: 100%;
    }
`