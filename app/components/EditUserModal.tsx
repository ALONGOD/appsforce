import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Alert
} from '@mui/material';
import { User } from '../types/user';

interface EditUserModalProps {
    open: boolean;
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
    allUsers: User[];
}

export default function EditUserModal({ open, user, onClose, onSave, allUsers }: EditUserModalProps) {
    const [formData, setFormData] = useState({
        firstName: user?.name?.first || '',
        lastName: user?.name?.last || '',
        email: user?.email || '',
        street: user?.location?.street?.name || '',
        city: user?.location?.city || '',
        country: user?.location?.country || ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};


        if (formData.firstName.length < 3) {
            newErrors.firstName = 'First name must be at least 3 characters';
        }
        if (formData.lastName.length < 3) {
            newErrors.lastName = 'Last name must be at least 3 characters';
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }


        const emailExists = allUsers.some(u =>
            u.email === formData.email && u.id.value !== user.id.value
        );
        if (emailExists) {
            newErrors.email = 'Email already exists';
        }


        if (!formData.street) newErrors.street = 'Street is required';
        if (!formData.city) newErrors.city = 'City is required';
        if (!formData.country) newErrors.country = 'Country is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const updatedUser = {
                ...user,
                name: {
                    ...user.name,
                    first: formData.firstName,
                    last: formData.lastName
                },
                email: formData.email,
                location: {
                    ...user.location,
                    street: {
                        ...user.location.street,
                        name: formData.street
                    },
                    city: formData.city,
                    country: formData.country
                }
            };
            onSave(updatedUser);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        error={!!errors.firstName}
                        helperText={errors.firstName}
                        fullWidth
                    />
                    <TextField
                        label="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        error={!!errors.lastName}
                        helperText={errors.lastName}
                        fullWidth
                    />
                    <TextField
                        label="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        error={!!errors.email}
                        helperText={errors.email}
                        fullWidth
                    />
                    <TextField
                        label="Street"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        error={!!errors.street}
                        helperText={errors.street}
                        fullWidth
                    />
                    <TextField
                        label="City"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        error={!!errors.city}
                        helperText={errors.city}
                        fullWidth
                    />
                    <TextField
                        label="Country"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        error={!!errors.country}
                        helperText={errors.country}
                        fullWidth
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary" variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}