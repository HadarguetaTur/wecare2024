import { Footer } from "flowbite-react"


function Copyright() {
  return (
    <Footer.Copyright
    href='#'
    by="Wecare"
    year={new Date().getFullYear()}
  />
  )
}

export default Copyright