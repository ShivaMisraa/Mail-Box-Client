import { useEffect, useState } from 'react';

const useDeleteRequest = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteResource = (url) => {
    setIsDeleting(true);

    return fetch(url, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to delete resource');
        }
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  return { deleteResource, isDeleting };
};
export default useDeleteRequest;

