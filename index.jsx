export default function Table({header, data, fetch}) {
    const generateRows = () => {
        return data?.data && data.data.map((item, index) =>
            <tr key={index}>
                {
                    header.map((head, index) => {
                        if (head.component)
                            return <td key={head.title + index}>{head.component}</td>
                        else if (head.transform)
                            return <td key={head.title + index}>{head.transform(item)}</td>
                        else if (!head.component) {
                            return <td key={head.title + index}>{item[head.column]}</td>
                        }

                    })
                }
            </tr>)
    }

    const paginationHandler = (label) => {
        const currentPage = data?.meta?.current_page;

        if (label.includes('قبلی'))
            fetch(currentPage - 1);
        else if (label.includes('بعدی'))
            fetch(currentPage + 1);
        else
            fetch(label);
    }

    return <div className="bg-white round shadow-sm table-responsive-md d-flex flex-column gap-5">
        <table className="table table-striped table-hover round">
            <thead>
            <tr>
                {
                    header.map((item, index) => <th key={index}>{item.title}</th>)
                }
            </tr>
            </thead>
            <tbody>
            {generateRows()}
            </tbody>
        </table>

        <nav className="d-flex mx-auto">
            <ul className="btn-group">
                {(data?.meta && data?.meta.total !== 0) && data.meta.links.map((link, index) =>

                    <button className={`btn btn-primary`}
                            disabled={(link.url === null) || (link.active)}
                            onClick={() => {
                                paginationHandler(link.label)
                            }}
                            key={link.label + index}
                    >
                        {link.label.includes("&laquo;") && "قبلی"}
                        {link.label.includes("&raquo;") && "بعدی"}
                        {(!link.label.includes("&raquo;") && !link.label.includes("&laquo;")) && link.label}
                    </button>
                )}
            </ul>
        </nav>
    </div>
}