export default function Avatar({ person, size }) {
    return (
        <img
            className="avatar"
            src={person.url}
            alt={person.name}
            width={size}
            height={size}
        />
    );
}