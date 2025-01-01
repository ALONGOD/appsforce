import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

interface SearchBarProps {
    searchTerm: string;
    searchBy: string;
    onSearchChange: (value: string) => void;
    onSearchByChange: (value: string) => void;
}

export default function SearchBar({ searchTerm, searchBy, onSearchChange, onSearchByChange }: SearchBarProps) {
    return (
        <div className="flex gap-4 mb-6">
            <TextField
                variant="outlined"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ width: '350px' }}
                sx={{
                    backgroundColor: 'white',
                }}
            />
            <FormControl style={{ minWidth: 150 }}>
                <InputLabel>Search by</InputLabel>
                <Select
                    value={searchBy}
                    label="Search by"
                    onChange={(e) => onSearchByChange(e.target.value)}
                    sx={{
                        backgroundColor: 'white',
                    }}
                >
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="id">ID</MenuItem>
                    <MenuItem value="location">Location</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}
