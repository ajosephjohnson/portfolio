export default function Container(
    {
        maxWidthClass = 'max-w-6xl',
        children,
    }
    : React.PropsWithChildren<{
        maxWidthClass?: string
    }>
) {
    return <div className={`${maxWidthClass} m-auto`}>
        {children}
    </div>;
}