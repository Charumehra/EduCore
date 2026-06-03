import { Link } from "react-router-dom";

const Navbar = () => {
	return (
		<nav className="w-full h-14 bg-[#D9D9D9] text-slate-900 border-b border-slate-300">
			<div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link to="/" className="text-xl font-semibold tracking-wide">
					EduCore
				</Link>

				<div className="flex items-center gap-6 text-sm font-medium">
					<Link to="/" className="transition-colors hover:text-cyan-400">
						Home
					</Link>
					<Link to="/register" className="transition-colors hover:text-cyan-400">
						Register
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
