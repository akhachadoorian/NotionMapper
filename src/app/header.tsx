import Link from "next/link"
import LogoImage from "../app/NineLogo.png"


export default function Header({}) {
    return (
        <div className="guide_header">
            <Link href={"/"} className="left">
                <img src={LogoImage.src} alt="Nine Logo" />
                <p className="">Caboose Help Center</p>
            </Link>

        </div>
    )
}