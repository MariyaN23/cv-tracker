import Header from "@/app/_components/Header";

export default function UsersLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header/>
            {children}
        </>
    );
}