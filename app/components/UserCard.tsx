import { useState } from 'react';
import { User } from '../types/user';
import Image from 'next/image';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditUserModal from './EditUserModal';


interface UserCardProps {
    user: User;
    onUpdateUser: (updatedUser: User) => void;
    onDeleteUser: (userId: string) => void;
    allUsers: User[];
}

export default function UserCard({ user, onUpdateUser, onDeleteUser, allUsers }: UserCardProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const handleDelete = () => {
        setIsDeleteDialogOpen(false);
        onDeleteUser(user.id.value);
    };

    return (
        <>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-full">
                <div className="p-6 flex-grow">
                    <div className="flex items-center">
                        <div className="flex items-center gap-4">
                            <Image
                                src={user.picture.medium}
                                alt={`${user.name.first} ${user.name.last}`}
                                width={64}
                                height={64}
                                className="rounded-full"
                            />
                            <div>
                                <h2 className="text-s font-semibold">
                                    {user.name.title} {user.name.first} {user.name.last}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 text-xs leading-normal">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <p className="text-gray-700 dark:text-gray-200">
                            {user.location.street.number} {user.location.street.name}
                        </p>
                        <p className="text-gray-700 dark:text-gray-200">
                            {user.location.city}, {user.location.country}
                        </p>
                    </div>
                </div>

                {/* Bottom fixed buttons */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-2">
                        <Button
                            startIcon={<EditIcon fontSize="small" />}
                            onClick={() => setIsEditModalOpen(true)}
                            variant="outlined"
                            color="primary"
                            size="small"
                            className="text-xs py-1"
                            fullWidth
                        >
                            Edit
                        </Button>
                        <Button
                            startIcon={<DeleteIcon fontSize="small" />}
                            onClick={() => setIsDeleteDialogOpen(true)}
                            variant="outlined"
                            color="error"
                            size="small"
                            className="text-xs py-1"
                            fullWidth
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </div>

            <EditUserModal
                open={isEditModalOpen}
                user={user}
                onClose={() => setIsEditModalOpen(false)}
                onSave={onUpdateUser}
                allUsers={allUsers}
            />

            <Dialog
                open={isDeleteDialogOpen}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsDeleteDialogOpen(false)}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}