import moment from "moment-timezone"

const Footer = () => {
    return (
        <footer className=" bg-neutral-900 text-gray-400 py-2">
            <div className="container mx-auto text-center">
            <p className="text-xs">© {moment().year()}</p>
            </div>
        </footer>
    )
}

export default Footer
