import "../style/header.css";

function Header({headerName}) {
  return (
    <>
      <header id="header">
        <span>{headerName}</span>
      </header>
    </>
  )
}

export default Header;
