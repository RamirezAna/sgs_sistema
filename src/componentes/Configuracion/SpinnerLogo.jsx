import './SpinnerLogo.css';
import logo1 from '../../assets/icono.png';

const SpinnerLogo = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="oscurecerContenido">
            <div className="spinner-container">
                <div className="spinner-border"></div>
                <img 
                    src={logo1}
                    alt="Cooperativa Capiata" 
                    className="spinner-logo"
                />
                <div className="spinner-text"></div>
            </div>
        </div>
    );
};

export default SpinnerLogo;


