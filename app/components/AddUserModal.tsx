import { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box
} from '@mui/material';
import { User } from '../types/user';

interface AddUserModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (newUser: User) => void;
    existingUsers: User[];
}

export default function AddUserModal({ open, onClose, onAdd, existingUsers }: AddUserModalProps) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        country: ''
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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (existingUsers.some(u => u.email === formData.email)) {
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
            const newUser: User = {
                id: { value: Date.now().toString() },
                name: {
                    first: formData.firstName,
                    last: formData.lastName,
                    title: 'Mr'
                },
                email: formData.email,
                location: {
                    street: { name: formData.street, number: 0 },
                    city: formData.city,
                    country: formData.country
                },
                picture: {
                    medium: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
                }
            };
            onAdd(newUser);
            onClose();
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                street: '',
                city: '',
                country: ''
            });
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Add New User</DialogTitle>
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
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} variant="contained">Add User</Button>
            </DialogActions>
        </Dialog>
    );
}