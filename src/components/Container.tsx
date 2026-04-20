import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import styles from "@/styles/Container.module.css";

type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href?: string;
  subLinks?: Array<{ text: string; href: string }>;
  i: number;
  className?: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home" },
  { href: "#about", text: "About" },
  {
    text: "Events",
    subLinks: [
      { href: "#events-online", text: "Online" },
      { href: "#events-offline", text: "Offline" },
    ],
  },
  { href: "#registration", text: "Registration" },
  // { href: "#services", text: "Services" },
  { href: "#contact", text: "Contact" },
];

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (href && href.startsWith("#")) {
    e.preventDefault();
    const section = document.querySelector(href);
    scrollTo(section);
  }
}

function NavItem(props: NavProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState<boolean>(false);

  if (props.subLinks && props.subLinks.length > 0) {
    return (
      <motion.li
        className={cn(props.className, "group relative")}
        onMouseEnter={() => setIsSubmenuOpen(true)}
        onMouseLeave={() => setIsSubmenuOpen(false)}
        variants={variants}
        custom={props.i}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <button
          type="button"
          onClick={() => setIsSubmenuOpen((prev) => !prev)}
          onFocus={() => setIsSubmenuOpen(true)}
          className={cn("nav-link flex items-center justify-end")}
          aria-expanded={isSubmenuOpen}
          aria-haspopup="menu"
        >
          {props.text}
        </button>
        <ul
          className={cn(
            "absolute right-0 top-full z-50 w-40 rounded-md border border-border/70 bg-background/95 p-2 shadow-lg backdrop-blur transition",
            isSubmenuOpen
              ? "visible translate-y-1 opacity-100"
              : "invisible pointer-events-none translate-y-0 opacity-0",
          )}
        >
          {props.subLinks.map((subLink) => (
            <li key={subLink.href}>
              <a
                href={subLink.href}
                onClick={handleClick}
                className="block rounded px-3 py-2 text-xs uppercase tracking-[0.12em] text-muted-foreground transition hover:bg-secondary/20 hover:text-foreground"
              >
                {subLink.text}
              </a>
            </li>
          ))}
        </ul>
      </motion.li>
    );
  }

  return (
    <motion.li
      className={props.className}
      variants={variants}
      custom={props.i}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={cn(props.i === 0 && "nav-active", "nav-link")}
      >
        {props.text}
      </a>
    </motion.li>
  );
}

export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: "Agronova'26",
    description: `Tamil Nadu Agricultural University`,
    image: "/KRJ512x512.png",
    type: "website",
    ...customMeta,
  };

  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    handleClick(e);
    setIsOpen(false);
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#7B82FE" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://www.wendoj.codes${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.wendoj.codes${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="KrJ" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="KrJ" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="icon" href="/favicon-new.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="16x16" href="/KRJ16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/KRJ32x32.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/KRJ192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/KRJ512x512.png" />
        <link rel="shortcut icon" href="/favicon-new.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/KRJ180x180.png" />
      </Head>
      <nav
        className={cn(
          styles.nav,
          "bg-primary shadow-md transition"
        )}
      >
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              styles.burger,
              "inline-flex transform items-center justify-center rounded-md p-2 transition-all duration-300 focus:outline-none text-white",
            )}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon data-hide={isOpen} />
            <CrossIcon data-hide={!isOpen} />
          </button>
        </div>
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-primary/30 bg-primary shadow-sm backdrop-blur sm:h-12 sm:w-12">
            <Image
              src="/assets/image copy 2.png"
              alt="Agronova logo"
              fill
              sizes="48px"
              className="object-cover"
            />
          </span>
          <span className="text-sm font-semibold tracking-[0.18em] text-white/90 uppercase sm:text-base">
            Tamil Nadu Agricultural University
          </span>
        </Link>

        {/* Desktop menu */}
        <ul className={styles["desktop-nav"]}>
          {navLinks.map((link, i) => (
            <NavItem
              key={link.text}
              href={link.href}
              text={link.text}
              i={i}
              subLinks={link.subLinks}
              className="text-[13px] font-medium tracking-wide"
            />
          ))}
        </ul>

        {/* Mobile menu */}
        <AnimatePresence key="menu">
          {isOpen && (
            <motion.div
              style={{ zIndex: 9999 }}
              className="fixed inset-0 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1, type: "spring", bounce: 0.25 }}
            >
              {/* Expandable menu */}
              <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b pl-[22px] pr-1">
                <span className="text-base font-medium lowercase">Menu</span>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={cn(styles.burger, "text-white")}
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <CrossIcon data-hide={!isOpen} />
                </button>
              </div>
              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                {/* Links */}
                <ul className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[58px]">
                  {navLinks.map((link) => (
                    <li key={link.text} className="w-full">
                      {link.subLinks && link.subLinks.length > 0 ? (
                        <>
                          <span className="text-sm font-semibold uppercase tracking-[0.14em] text-foreground/90">
                            {link.text}
                          </span>
                          <ul className="mt-3 space-y-3 pl-4">
                            {link.subLinks.map((subLink) => (
                              <li key={subLink.href}>
                                <a
                                  href={subLink.href}
                                  onClick={handleMobileLinkClick}
                                  className="text-base tracking-wide text-muted-foreground transition hover:text-foreground"
                                >
                                  {subLink.text}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <a
                          href={link.href}
                          onClick={handleMobileLinkClick}
                          className="text-xl tracking-wide text-foreground"
                        >
                          {link.text}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Footer */}
                <div className="flex min-h-fit w-full flex-col space-y-8 px-[22px] py-10">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Team.Agronova&apos;26. All rights reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
          html,
          body {
            overflow-y: ${isOpen ? "hidden" : "initial"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
            touch-action: ${isOpen ? "none" : "unset"};
            -ms-touch-action: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>

      {/* Main content */}
      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-5 w-5 text-neutral-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 2.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className="absolute h-5 w-5 text-neutral-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
