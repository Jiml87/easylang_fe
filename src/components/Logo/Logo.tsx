import Link from 'next/link';
import Image from 'next/image';
import logoImage from '@/assets/brandImages/logo_full.svg';

const Logo = () => {
  return (
    <Link href="/">
      <Image src={logoImage} width={129} height={30} alt="Logo" />
    </Link>
  );
};

export default Logo;
