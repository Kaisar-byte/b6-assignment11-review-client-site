import React, { useContext } from "react";
import { RxAvatar } from "react-icons/rx";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider";

const Header = () => {
	const { LogOut, user } = useContext(AuthContext);
	const handleLogOut = () => {
		LogOut()
			.then(() => { })
			.catch((err) => console.log(err));
	};
	return (
		<div className="navbar bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/services">Service</Link>
						</li>
						<li>
							<Link to="/faq">FAQ</Link>
						</li>
						<li>
							<Link to="/blog">Blog</Link>
						</li>
					</ul>
				</div>
				<Link to="/" className="btn btn-ghost normal-case text-xl hidden lg:block md:block">
					Dentist Jishan
				</Link>
			</div>
			<div className="navbar-center hidden lg:flex ">
				<ul className="menu menu-horizontal px-1">
					{user?.email ? (
						<>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/services">Service</Link>
							</li>
							<li>
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								<Link to="/blog">Blog</Link>
							</li>
							<li>
								<Link to="/reviews">My Review</Link>
							</li>
							<li>
								<Link to="/addservice">Add Service</Link>
							</li>
						</>
					) : (
						<>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/services">Service</Link>
							</li>
							<li>
								<Link to="/faq">FAQ</Link>
							</li>
							<li>
								<Link to="/blog">Blog</Link>
							</li>
						</>
					)}
				</ul>
			</div>
			<div className="navbar-end">
				{user?.email ? (
					<>
						{user?.photoURL ? (
							<>
								<img
									src={user?.photoURL || "unregister"}
									className="w-10 rounded-full"
									alt=""
								/>
							</>
						) : (
							<>
								<RxAvatar size={"34px"}></RxAvatar>
							</>
						)}
						<Link>
							<button
								onClick={handleLogOut}
								className="btn btn-outline btn-success ml-4"
							>
								Log Out
							</button>
						</Link>
					</>
				) : (
					<>
						<Link to="/login">
							<button className="btn btn-outline btn-success mr-2">
								Sign In
							</button>
						</Link>
						<Link to="/signup">
							<button className="btn btn-active btn-success">Sign Up</button>
						</Link>
					</>
				)}
			</div>
		</div>
	);
};

export default Header;
