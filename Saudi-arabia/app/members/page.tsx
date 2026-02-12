"use client"
import { useEffect, useState } from "react";
import Hero from "@/components/ui/hero";
import {fetchUsers} from "@/app/api/fetchUsers";

type Member = {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    user_view_type: string;
    site_admin: boolean;
};

export default function Members() {
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetchUsers();
                setMembers(res);
            } catch (err) {
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            <Hero
                image="/about-us.jpg"
                title="About Us"
                description="Discover the country's hidden gems and breathtaking landscapes"
            />

            <div className="container mx-auto mt-8">
                {error && <p className="text-red-500">Error: {error}</p>}
                {members.length > 0 ? (
                    members.map((member: Member) => (
                        <div key={member.id} className="mb-4">
                            <h2 className="text-lg font-bold">{member.login}</h2>
                            <p className="text-sm">Profile: <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">{member.html_url}</a></p>
                        </div>
                    ))
                ) : (
                    !error && <p>Loading members...</p>
                )}
            </div>
        </div>
    );
}