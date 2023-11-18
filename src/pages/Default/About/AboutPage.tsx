import { FacebookIcon, FacebookShareButton, InstagramIcon, InstapaperShareButton, TelegramIcon, TelegramShareButton } from "next-share"
import Loading from "../../../components/Loading/Loading"
import "./AboutPage.css"

export const AboutPage = () => {
    return (
        <div className="container">
            <Loading></Loading>
            <div className="AboutUs">
                <h1>Fetelix</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <div className="ShareDiv">
                    <FacebookShareButton
                        url={'Fetelix.com'}
                        quote={'Fetelix is free movie service. Look it!'}
                        hashtag={'#Fetelix'}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TelegramShareButton
                        url={'Fetelix.com'}
                        title={'Fetelix is free movie service. Look it!'}
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <InstapaperShareButton
                        url={'Fetelix.com'}
                        title={'Fetelix is free movie service. Look it!'}
                    >
                        <InstagramIcon size={32} round />
                    </InstapaperShareButton>
                </div>
            </div>
            made by Jonika
        </div>
    )
}