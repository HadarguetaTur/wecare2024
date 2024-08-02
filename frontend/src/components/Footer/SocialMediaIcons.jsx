import { Footer } from "flowbite-react"
import { BsDribbble, BsFacebook, BsInstagram, BsTwitter } from "react-icons/bs"


function SocialMediaIcons() {
  return (
    <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
    <Footer.Icon href='#' icon={BsFacebook}/>
    <Footer.Icon href='#' icon={BsInstagram}/>
    <Footer.Icon href='#' icon={BsTwitter}/>
    <Footer.Icon href='#' icon={BsDribbble}/>

  </div>
  )
}

export default SocialMediaIcons
