
import { createClient } from '@sanity/client';

export const client = createClient({
    projectId: 'zcovo2xk',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-01-01',
});

async function main() {
    try {
        console.log("Fetching all services (raw)...");
        const query = `*[_type == "service"]{_id, title, isVisible}`;
        const data = await client.fetch(query);
        console.log('All Services Raw:', JSON.stringify(data, null, 2));

        console.log("\nFetching filtered services...");
        const filteredQuery = `*[_type == "service" && !(_id in path("drafts.**")) && (isVisible == true || !defined(isVisible))]`;
        const filteredData = await client.fetch(filteredQuery);
        console.log('Filtered Services:', JSON.stringify(filteredData, null, 2));

        console.log("\nFetching filtered services (simplified)...");
        const simpleQuery = `*[_type == "service" && (isVisible == true || !defined(isVisible))]`;
        const simpleData = await client.fetch(simpleQuery);
        console.log('Simple Filtered Services:', JSON.stringify(simpleData, null, 2));

    } catch (error) {
        console.error("Error:", error.message);
    }
}

main();
