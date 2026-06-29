import { useState, useEffect } from "react";
import { getProvinces } from "../../../services/province.services.js";
import { crearAdmin } from "../../../services/user.services.js";
import { toast } from "sonner";

export default function NewAdminModal({ onClose, onCreated }) {
    const [form, setForm] = useState({
        fullName: '',
        email: '',
        password: '',
        accommodationName: '',
        province: '',
        whatsapp: ''
    });
    const [provinces, setProvinces] = useState([]);
    const [enviando, setEnviando] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        const loadProvinces = async () => {
            try {
                const data = await getProvinces();
                setProvinces(data);
            } catch (error) {
                toast.error('Error al cargar provincias');
            }
        };

        loadProvinces();
    }, []);

    const handleSubmit = async () => {
        if (!form.fullName || !form.email || !form.password || !form.accommodationName || !form.province || !form.whatsapp) {
            toast.error('Completá todos los campos');
            return;
        }
        setEnviando(true);
        try {
            await crearAdmin(form);
            toast.success('Administrador creado correctamente');
            onCreated();
            onClose();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Error al crear el administrador');
        } finally {
            setEnviando(false);
        }
    };

    return (
        <div className="sa-modal-overlay" onClick={onClose}>
            <div className="sa-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Nuevo Administrador</h3>
                <div className="modal-field">
                    <label>Nombre completo</label>
                    <input
                        name="fullName"
                        placeholder="Nombre completo del administrador"
                        value={form.fullName}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-field">
                    <label>Email</label>
                    <input
                        name="email"
                        type="email"
                        placeholder="admin@ejemplo.com"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-field">
                    <label>Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-field">
                    <label>Nombre del hospedaje</label>
                    <input
                        name="accommodationName"
                        placeholder="Ej. Hotel Paraíso"
                        value={form.accommodationName}
                        onChange={handleChange}
                    />
                </div>
                <div className="modal-field">
                    <label>Provincia</label>
                    <select
                        name="province"
                        value={form.province}
                        onChange={handleChange}
                    >
                        <option value="">Seleccionar provincia</option>
                        {provinces.map((province) => (
                            <option key={province._id} value={province._id}>
                                {province.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="modal-field">
                    <label>WhatsApp del hospedaje</label>
                    <input
                        name="whatsapp"
                        placeholder="Ej. 5493815833048"
                        value={form.whatsapp}
                        onChange={handleChange}
                    />
                </div>
                <div className="sa-modal-actions">
                    <button className="action-btn" onClick={onClose} disabled={enviando}>
                        Cancelar
                    </button>
                    <button className="action-btn activate" onClick={handleSubmit} disabled={enviando}>
                        {enviando ? 'Creando...' : 'Crear'}
                    </button>
                </div>
            </div>
        </div>
    );
}
