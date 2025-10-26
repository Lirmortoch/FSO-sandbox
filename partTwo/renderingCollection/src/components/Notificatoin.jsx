export default function Notification({ message }) {
    if (message === null) {
        return;
    }

    return (
        <div className="error">
            {message}
        </div>
    )
}