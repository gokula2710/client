//import logo from '../logo.png'
import { format } from 'date-fns'
const AlertDetails = ({alerts}) => {
    return (
        <div className="computer-logo">
                    <div className="alert-info">
                        <h2><span className="value">{alerts.name}</span></h2>
                        <h2>Lab: <span className="value">{alerts.lab}</span></h2>
                        <p>Warranty Expiring for {alerts.name} on {format(new Date(alerts.warranty),'dd-MM-yyyy')}</p>
                    </div>
                </div>
      );
}
 
export default AlertDetails;
