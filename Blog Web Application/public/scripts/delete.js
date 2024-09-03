$(".blogDeleteButton").on('click', async (event) => {
    event.preventDefault();
    if (event.type === 'click') {
        // Get the clicked button's ID
        const buttonId = event.target.id;

        $.ajax({
            url: '/delete',
            type: 'DELETE',
            data: { id: buttonId },
            success: (data, textStatus, jqXHR) => {
                if (jqXHR.status === 201) {
                    alert('Blog post deleted successfully', data);
                    // Refresh the page
                    window.location.reload(false);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 500) {
                    console.error('Client: Error deleting file:', jqXHR.responseJSON.error);
                    alert('Client: An error occurred while deleting the blog!');
                } else if (jqXHR.status === 404) {
                    console.error('Client: Blog file not found:', jqXHR.responseJSON.error);
                    alert('Client: Blog does not exist!');
                } else {
                    console.error('Client: Unknown error:', errorThrown);
                    alert('Client: An unknown error occurred.');
                }
            }
        });
    }
});