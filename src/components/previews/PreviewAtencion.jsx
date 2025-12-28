import React from 'react';

const PreviewAtencion = ({ items, onRemove, total, currentUser, currentBranch }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-green-600 mb-3">Preview de la atención</h2>

      <div className="border-t border-gray-200 pt-3 mb-4">
        {items.length === 0 ? (
          <div className="text-gray-500 italic py-2">No hay servicios ni productos agregados.</div>
        ) : (
          <div>
            {items.map((item) => (
              <div key={item.uid} className="flex justify-between items-center p-2 bg-gray-50 rounded mb-2">
                <div>
                  <strong>{item.name}</strong>
                  <div className="text-xs text-gray-500">{item.type === 'serv' ? 'Servicio' : 'Producto'}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{item.price.toFixed(2)} Bs.</span>
                  <button
                    onClick={() => onRemove(item.uid)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-right font-bold text-lg">
        Total: <span id="total-amount">{total.toFixed(2)}</span> Bs.
      </div>

      <hr className="border-t border-gray-200 my-4" />

      <div className="flex justify-between items-center">
        <div>
          <span className="text-sm text-gray-500">Encargado:</span>
          <br />
          <strong>{currentUser}</strong>
        </div>
        <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-sm">
          {currentBranch}
        </div>
      </div>
    </div>
  );
};

export default PreviewAtencion;