"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issue", href: "/issues" },
  ];

  return (
    <nav className="flex gap-6 border-b mb-5 p-5 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li>
            <Link
              className={classNames({
                "text-zinc-900": link.href === currentPath,
                "hover:text-zinc-800 transition-colors text-zinc-500":
                  link.href !== currentPath,
              })}
              key={link.href}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
