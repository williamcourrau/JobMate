import { UserCard } from './UserCard';
import { Logocard } from './LogoCard';

export function Header() {
  return (
    <header className="header" style={{ display: 'flex', alignItems: 'right', width: '100%', height: '10%' }}>
      <div className="logo-card-container" style={{ display: 'flex', alignItems: 'center', paddingLeft: '20px' }}>
        <Logocard />
      </div>
      <div className="logo" style={{ alignItems: 'end', background: '#FFFFFF', width:'1000', color: '#000000', flex: 1, fontSize: '24px', fontWeight: 'bold' }}>
        <UserCard userName={'JUAN'} jobTitle={'Software Engineer'} profilePicture={''}></UserCard>
      </div>
    </header>
  );
}