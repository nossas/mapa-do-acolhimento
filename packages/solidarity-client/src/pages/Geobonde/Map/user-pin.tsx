import React from 'react';
import PropTypes from 'prop-types'
import { User } from '../../../models/table-data';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
};

interface Props {
  size: number
  onClick?: (user: User) => void
  user: User
}

const UserPin: React.FC<Props> = ({ size, onClick, user }) => {
  const handleSvgClick = () => onClick && onClick(user)
  return (
    <svg
      height={size}
      viewBox="0 0 24 24"
      style={{
        ...pinStyle,
        transform: `translate(${-size / 2}px,${-size}px)`,
      }}
      onClick={handleSvgClick}
    >
      <path d={ICON} />
    </svg>
  )
}

UserPin.defaultProps = {
  onClick: undefined,
}

UserPin.propTypes = {
  size: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  user: PropTypes.shape({
    latitude: PropTypes.string.isRequired,
    longitude: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    data_de_inscricao_no_bonde: PropTypes.string,
    user_id: PropTypes.number.isRequired,
    condition: PropTypes.string.isRequired,
    organization_id: PropTypes.number.isRequired,
    tipo_de_acholhimento: PropTypes.string.isRequired,
    status_acolhimento: PropTypes.string.isRequired,
    status_inscricao: PropTypes.string.isRequired,
    ticket_status: PropTypes.string.isRequired,
    ticket_id: PropTypes.number.isRequired,
  }).isRequired,
}

export default UserPin
