import "../style/header.css";

function Header({headerName, headerAction}) {
  return (
    <>
      <header id="header">
        <span><a onClick={headerAction}>{headerName}</a></span>
      </header>
    </>
  )
}

export default Header;
