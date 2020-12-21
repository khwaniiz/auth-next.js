
import Link from 'next/link'
import { VehiclePerson } from '../../api/VehiclePerson'

export interface DetailsProps {
    ownersList: VehiclePerson | undefined;
}

export default function Details({ ownersList }: DetailsProps) {
    return (
        <div>
            {ownersList.map((e, index) => (
                <div key={index}>
                    <Link as={`/${e.vehicle}/${e.ownerName}`} href="/[vehicle]/[person]">
                        <a>
                            Navigate to {e.ownerName}'s {e.vehicle}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
}


Details.getInitialProps = async () => {
    const response = await fetch('http://localhost:4001/vehicles');
    const ownersList: VehiclePerson[] | undefined = await response.json();
    return { ownersList: ownersList }
}