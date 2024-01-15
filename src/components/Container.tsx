export default function Container({ children }: React.PropsWithChildren) {
    return <div className="sm:max-w-6xl m-auto ">
        {children}
    </div>;
}