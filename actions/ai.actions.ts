import axiosInstance, { endpoints } from '@/lib/axios';

interface MaterialSpecification {
	[key: string]: string;
}

export async function aiRecommendations({
	part_id,
	plant_name,
	materialSpecification,
}: {
	part_id: string;
	plant_name: string[];
	materialSpecification: MaterialSpecification;
}) {
	const URL = endpoints.ai.recommendations;
	const response = await axiosInstance.post(URL, {
		part_id,
		plant_name,
		Material_specifications: materialSpecification,
	});
	return response.data;
}

export async function aiQuotationGeneration({ part_id }: { part_id: string }) {
	const URL = endpoints.ai.quotation;
	const response = await axiosInstance.post(URL, { part_id });
	return response.data;
}
