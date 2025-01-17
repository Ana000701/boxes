import { Link } from "react-router-dom";

function Navbar({logo}) {
    return (
        <div className='flex flex-col md:flex-row justify-between items-center py-5 xl:container mx-auto'>
            <Link to='/'><img src={logo} alt="紙箱轉運站" height='56' width='235' /></Link>
            <div className="flex justify-between items-center gap-5">
                <Link to='/map'>紙箱地圖</Link>
                <button className="py-2 px-5 bg-yellow-700 text-yellow-50 rounded-full border-yellow-950 border-2 border-solid">登入</button>
            </div>
        </div>
    );
}

export default Navbar;