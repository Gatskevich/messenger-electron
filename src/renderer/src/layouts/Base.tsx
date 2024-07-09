import Navbar, { NavbarProps } from '../components/Navbar';

function getDisplayName(Component: () => JSX.Element) {
  return Component.name || 'Component';
}

export const withBaseLayout = (Component: () => JSX.Element, config: NavbarProps | null = null) => (props) => {
  const viewName = getDisplayName(Component);

  return (
    <>
      <Navbar {...config} view={viewName} />
      <Component {...props} />
    </>
  )
}
