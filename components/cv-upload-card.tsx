import { useState, DragEvent } from "react"
import { toast } from "sonner"

export default function CVUploadCard() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState<File | null>(null)
    const [dragging, setDragging] = useState(false)

    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 Mo en octets

    const handleFileSelect = (newFile: File | null) => {
        if (!newFile) return

        const allowed = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ]

        // Vérification du type
        if (!allowed.includes(newFile.type)) {
            toast.error("Format non valide. PDF, DOC ou DOCX uniquement.")
            return
        }

        // Vérification de la taille
        if (newFile.size > MAX_FILE_SIZE) {
            toast.error("Le fichier dépasse la taille maximale de 5 Mo.")
            return
        }

        setFile(newFile)
    }

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault()
        setDragging(false)

        const droppedFile = e.dataTransfer.files?.[0]
        handleFileSelect(droppedFile || null)
    }

    const handleSubmit = async () => {
        const storedUser = JSON.parse(localStorage.getItem("auth_user") || "{}")
        const token = localStorage.getItem("auth_token")
        const baseURL = process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL ?? 'http://localhost'

        if (!file) {
            toast.error("Veuillez sélectionner un fichier")
            return
        }

        const formData = new FormData()
        formData.append("user_id", storedUser.id)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("file_path", file)

        try {
            const res = await fetch(baseURL + "/api/v1/candidates", {
                method: "POST",
                headers: { Authorization: `Bearer ${token}` },
                body: formData,
            })

            if (!res.ok) throw new Error("Upload échoué")

            toast.success("CV uploadé avec succès 🎉")
            setTitle("")
            setDescription("")
            setFile(null)
        } catch (error) {
            toast.error("Échec de l’upload ❌")
        }
    }

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Uploader un CV</h3>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Titre</label>
                    <input
                        className="w-full px-4 py-2 border rounded-lg"
                        value={title}
                        placeholder="Le nom du fichier"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Dropzone */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        setDragging(true)
                    }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("fileInput")?.click()}
                    className={`
                        border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
                        ${dragging ? "border-primary bg-primary/10" : "border-border"}
                    `}
                >
                    <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                    />

                    {!file ? (
                        <div className="text-muted-foreground">
                            <p className="font-medium text-base">Dépose ton fichier ici</p>
                            <p className="text-sm mt-1">ou clique pour sélectionner · (PDF, DOC, DOCX, max 5 Mo)</p>
                        </div>
                    ) : (
                        <div className="text-primary font-medium">{file.name}</div>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-primary text-white w-full rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                    Uploader le CV
                </button>
            </div>
        </div>
    )
}
