import logo from '../assets/images/LogoSanaMind.png'

function Logo({ size = 36 }) {
  return (
    <img
      src={logo}
      alt="SanaMind"
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
    />
  )
}

export default Logo
