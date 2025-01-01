"use client"
import { useState } from 'react';
import { User } from '../types/user';
import UserCard from './UserCard';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddUserModal from './AddUserModal';
import SearchBar from './SearchBar';

interface UserListProps {
    initialUsers: User[];
}

export default function UserList({ initialUsers }: UserListProps) {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchBy, setSearchBy] = useState('name');

    const filteredUsers = users.filter(user => {
        const searchLower = searchTerm.toLowerCase();

        switch (searchBy) {
            case 'name':
                const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
                return fullName.includes(searchLower);
            case 'email':
                return user.email.toLowerCase().includes(searchLower);
            case 'id':
                return user.id.value?.toLowerCase().includes(searchLower);
            case 'location':
                const location = `${user.location.city} ${user.location.country}`.toLowerCase();
                return location.includes(searchLower);
            default:
                return true;
        }
    });

    const handleUpdateUser = (updatedUser: User) => {
        setUsers(users.map(user =>
            user.id.value === updatedUser.id.value ? updatedUser : user
        ));
    };

    const handleAddUser = (newUser: User) => {
        setUsers([...users, newUser]);
    };

    const handleDeleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id.value !== userId));
    };


    return (
        <div className="space-y-6">
            <div className="flex justify-end">
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddModalOpen(true)}
                    variant="contained"
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        '&:hover': {
                            backgroundColor: '#f0f0f0',
                        },
                    }}
                >
                    Add User
                </Button>
            </div>

            <SearchBar
                searchTerm={searchTerm}
                searchBy={searchBy}
                onSearchChange={setSearchTerm}
                onSearchByChange={setSearchBy}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map((user) => (
                    <UserCard
                        key={user.id.value || Math.random()}
                        user={user}
                        onUpdateUser={handleUpdateUser}
                        onDeleteUser={handleDeleteUser}
                        allUsers={users}
                    />
                ))}
            </div>

            <AddUserModal
                open={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAdd={handleAddUser}
                existingUsers={users}
            />
        </div>
    );
}