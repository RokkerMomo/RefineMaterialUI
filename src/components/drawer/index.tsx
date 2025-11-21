import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, Container, MenuItem, Typography, TextField, Stack, useTheme } from '@mui/material';
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LanguageIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import { useGetIdentity, useNotification } from "@refinedev/core";
import { API_URL, dataProvider } from "../../providers/data";

interface TemporaryDrawerProps {
  onMenuClose?: () => void;
}

type IUser = {
  id: number;
  name: string;
  avatar: string;
  jobTitle: string;
  phone: string;
  email: string;
  timezone: string;
};

export default function TemporaryDrawer({ onMenuClose }: TemporaryDrawerProps) {


  return (
    <div>
      <MenuItem onClick={(e) => {
        e.stopPropagation();
        if (onMenuClose) {
          onMenuClose();
        }
      }}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Account Settings
      </MenuItem>
    </div>
  );
}

export function AccountSettingsDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const theme = useTheme();
  const { data: user, refetch } = useGetIdentity<IUser>();
  const { open: notificationOpen } = useNotification();
  const [isEditMode, setIsEditMode] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    jobTitle: user?.jobTitle || '',
    timezone: user?.timezone || '',
  });

  // Update form data when user data changes
  React.useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        jobTitle: user.jobTitle || '',
        timezone: user.timezone || '',
      });
    }
  }, [user]);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        jobTitle: user.jobTitle || '',
        timezone: user.timezone || '',
      });
    }
  };

  const handleSave = async () => {
    if (!user?.id) {
      notificationOpen?.({
        type: "error",
        message: "Error",
        description: "User ID not found",
      });
      return;
    }

    setIsLoading(true);
    const accessToken = localStorage.getItem("access_token");

    try {
      await dataProvider.custom({
        url: API_URL,
        method: "post",
        headers: accessToken
          ? {
              Authorization: `Bearer ${accessToken}`,
            }
          : {},
        meta: {
          variables: {
            input: {
              id: user.id.toString(),
              update: {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                jobTitle: formData.jobTitle,
                timezone: formData.timezone,
              },
            },
          },
          rawQuery: `
            mutation UpdateUser($input: UpdateOneUserInput!) {
              updateOneUser(input: $input) {
                id
                name
                avatarUrl
                email
                phone
                jobTitle
                timezone
              }
            }
          `,
        },
      });

      // Refresh user identity
      await refetch?.();

      setIsEditMode(false);
      setIsLoading(false);
      notificationOpen?.({
        type: "success",
        message: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      setIsLoading(false);
      notificationOpen?.({
        type: "error",
        message: "Error",
        description: "Failed to update profile. Please try again.",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Drawer
      anchor='right'
      open={open}
      onClose={onClose}
    >
      <Box
        sx={{ 
          width: 400, 
          p: 3, 
          backgroundColor: theme.palette.background.default, 
          height: "100%", 
          overflow: "auto" 
        }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
      >
        <Container sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
        }}>
          <Typography variant="h6">Account Settings</Typography>
          <CloseIcon 
            sx={{ marginLeft: "auto", cursor: "pointer" }} 
            onClick={onClose} 
          />
        </Container>

        <Container>
          <Box sx={{
            backgroundColor: theme.palette.background.paper,
            padding: 2,
            borderRadius: 2,
            border: 1,
            borderColor: theme.palette.divider,
          }}>
            <Box sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}>
              <Typography sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}>
                <PersonIcon /> User profile
              </Typography>
              {!isEditMode && (
                <Button
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  size="small"
                  variant="outlined"
                >
                  Edit
                </Button>
              )}
            </Box>

            {isEditMode ? (
              <Stack spacing={2}>
                <TextField
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Timezone"
                  value={formData.timezone}
                  onChange={(e) => handleInputChange("timezone", e.target.value)}
                  fullWidth
                  size="small"
                />
                <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                  <Button
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    variant="contained"
                    disabled={isLoading}
                    fullWidth
                  >
                    Save
                  </Button>
                  <Button
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    variant="outlined"
                    disabled={isLoading}
                    fullWidth
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            ) : (
              <Stack spacing={2}>
                <Box sx={{
                  borderTop: 1,
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                  py: 2,
                }}>
                  <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                    fontWeight: "medium",
                  }}>
                    <BadgeIcon /> Job Title
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 4 }}>
                    {user?.jobTitle || "Not set"}
                  </Typography>
                </Box>

                <Box sx={{
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                  py: 2,
                }}>
                  <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                    fontWeight: "medium",
                  }}>
                    <PersonIcon /> Name
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 4 }}>
                    {user?.name || "Not set"}
                  </Typography>
                </Box>

                <Box sx={{
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                  py: 2,
                }}>
                  <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                    fontWeight: "medium",
                  }}>
                    <EmailIcon /> Email
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 4 }}>
                    {user?.email || "Not set"}
                  </Typography>
                </Box>

                <Box sx={{
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                  py: 2,
                }}>
                  <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                    fontWeight: "medium",
                  }}>
                    <LocalPhoneIcon /> Phone
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 4 }}>
                    {user?.phone || "Not set"}
                  </Typography>
                </Box>

                <Box sx={{
                  borderBottom: 1,
                  borderColor: theme.palette.divider,
                  py: 2,
                }}>
                  <Typography sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    mb: 1,
                    fontWeight: "medium",
                  }}>
                    <LanguageIcon /> Timezone
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 4 }}>
                    {user?.timezone || "Not set"}
                  </Typography>
                </Box>
              </Stack>
            )}
          </Box>
        </Container>
      </Box>
    </Drawer>
  );
}
