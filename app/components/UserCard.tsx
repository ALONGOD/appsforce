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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col min-h-[300px] w-full">
                <div className="p-4 flex-grow flex flex-col items-center justify-center">
                    <div className="flex flex-col items-center text-center">
                        <Image
                            src={user.picture.medium}
                            alt={`${user.name.first} ${user.name.last}`}
                            width={80}
                            height={80}
                            className="rounded-full mb-3"
                        />
                        <div className="space-y-1.5">
                            <h2 className="text-lg font-semibold">
                                {user.name.title} {user.name.first} {user.name.last}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-m">{user.email}</p>
                            <div className="text-sm text-gray-700 dark:text-gray-200">
                                <p>{user.location.street.number} {user.location.street.name}</p>
                                <p>{user.location.city}, {user.location.country}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-2 gap-3">
                        <Button
                            startIcon={<EditIcon fontSize="small" />}
                            onClick={() => setIsEditModalOpen(true)}
                            color="primary"
                            size="small"
                            className="text-xs py-1.5 rounded-full"
                            fullWidth
                            disableRipple
                            sx={{
                                '& .MuiButton-startIcon': {
                                    transition: 'transform 1s',
                                },
                                '&:hover .MuiButton-startIcon': {
                                    transform: 'scale(1.6)',
                                },
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    borderColor: 'primary.main',
                                },
                            }}
                        >
                        </Button>

                        <Button
                            startIcon={<DeleteIcon fontSize="small" />}
                            onClick={() => setIsDeleteDialogOpen(true)}
                            color="error"
                            size="small"
                            className="text-xs py-1.5 rounded-full"
                            fullWidth
                            disableRipple
                            sx={{
                                '& .MuiButton-startIcon': {
                                    transition: 'transform 0.8s',
                                },
                                '&:hover .MuiButton-startIcon': {
                                    transform: 'scale(1.4)',
                                },
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    borderColor: 'error.main',
                                },
                            }}
                        >
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