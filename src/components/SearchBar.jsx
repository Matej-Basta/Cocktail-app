function SearchBar(props) {

    const {setSearch, search, setResult} = props;

    return (
    <>
        <input onChange={(e) => setSearch(e.target.value)} onKeyUp={(e) => {if(e.code === "Enter") {setResult(e.target.value)}}} type="search" />
        <button onClick={() => setResult(search)}>Search</button>
        <br />
    </>
    );
}

export default SearchBar;