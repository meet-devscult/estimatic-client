import { endpoints } from '@/lib/axios';
import axios from 'axios';

export async function getCompany() {
    const URL = endpoints.companies.root;
    const response = await axios.get(URL)
    return response
}