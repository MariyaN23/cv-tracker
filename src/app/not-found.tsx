import Link from "next/link";

export default function NotFound() {
    return (
        <main className={'p-[20%] text-center'}>
            <h2 className={'text-3xl'}>There was a problem.</h2>
            <p>We could not find the page you were looking for</p>
            <p>Go back to the <Link href={'/'} className={'text-red-500'}>
                    Main page
                </Link></p>
        </main>
    );
}