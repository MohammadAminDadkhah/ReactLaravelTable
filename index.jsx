export default function Table({header, data, fetch}) {
    const generateRows = () => {
        return data?.data && data.data.map((item) =>
            <tr key={item.id}>
                {
                    header.map(head => {
                        if (head.component)
                            return <td key={item.id + "_manage"}>{head.component}</td>
                        else if (head.transform)
                            return <td key={item.id + "_" + head.column}>{head.transform(item)}</td>
                        else if (!head.component) {
                            return <td key={item.id + "_" + head.column}>{item[head.column]}</td>
                        }

                    })
                }
            </tr>)
    }

    const paginationHandler = (label) => {
        const currentPage = data?.meta?.current_page;

        if (label.includes('Pre'))
            fetch(currentPage - 1);
        else if (label.includes('ext'))
            fetch(currentPage + 1);
        else
            fetch(label);


    }
    return <div className="bg-white p-3 round shadow-sm table-responsive-md  d-flex flex-column gap-5">
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
                {data?.meta && data.meta.links.map((link) =>
                    <button className={`btn btn-primary`}
                            disabled={(link.url === null) || (link.active)}
                            onClick={() => {
                                paginationHandler(link.label)
                            }}
                            key={link.label}>
                        {link.label.includes("Pre") && 'قبلی'}
                        {link.label.includes("ext") && 'بعدی'}
                        {(!link.label.includes("Pre") && !link.label.includes("ext")) && link.label}
                    </button>
                )}
            </ul>
        </nav>
    </div>
}
