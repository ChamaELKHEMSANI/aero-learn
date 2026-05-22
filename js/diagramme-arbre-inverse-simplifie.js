class DiagrammeArbreInverseSimplifie {
  constructor(xmlParser, bModal) {
    this.xmlParser = xmlParser;
    this.bModal = bModal;
    this.lng = "en";
    this.bControlsEnabled = true;
    this.querySelect = null;
    this.queryModal = null;
    this.queryDetails = null;
    this.dataRef = null;
    this.selectedNode = null;
    this.showToolBadges = true;
    this.blBadgeDocs = true;
    this.blBadgePosts = true;
    this.blBadgeTasks = true;
    this.blBadgeAbbrev = true;
    this.pinned = null;
    this.activeAnchorEl = null;
    this.hoverOnTooltip = false;
    this.hideTimer = null;
    this.root = null;
    this.fullRoot = null;
    this.currentRootNode = null;
    this.display_mode = "arbre-inverse-simplifie";
    this.svg = null;
    this.gRoot = null;
    this.gAscendants = null;
    this.gMainTree = null;
    this.gLinksHalo = null;
    this.gLinks = null;
    this.gNodes = null;
    this.zoom = null;
    this.HOME = null;
    this.TREE_ORIENTATION = {
      dx: 300,
      dy: 200,
      separation: (a, b) => (a.parent === b.parent ? 1.2 : 1.6),
    };
    this.MAX_TEXT_W = 270;
    this.PAD_X = 16;
    this.PAD_Y = 45;
    this.scrollbar = {
      x: null,
      y: null,
      container: null,
      zoomBtn: null,
      zoomOutBtn: null,
      fitBtn: null,
      expandAllBtn: null,
      collapseAllBtn: null,
      toggleBtn: null,
      isDraggingX: false,
      isDraggingY: false,
      isCollapsed: false,
    };
    this.translations = {
      fr: {
        detailsTitle: "Détails du Département",
        error: "Erreur",
        collapseAll: "Tout regrouper",
        expandAll: "Tous déployer",
        zoomIn: "Zoom avant",
        zoomOut: "Zoom arrière",
        fitToScreen: "Adapter à l'écran",
        resetView: "Réinitialiser la vue",
        toggleControls: "Masquer/Afficher les contrôles",
        showControls: "Afficher les contrôles",
        hideControls: "Masquer les contrôles",
        close: "Fermer",
        backToRoot: "Retour à la racine",
        checkProvider: "Vérifiez que le fournisseur est accessible.",
        noData: "Données non disponibles",
        companyName: "Compagnie Aérienne",
        companyDescription:
          "Structure organisationnelle de la compagnie aérienne",
        noName: "Sans nom",
        noDescription: "Aucune description",
        undefinedType: "non défini",
        badgeDocs: "Docs",
        badgePositions: "Postes",
        badgeTasks: "Tâches",
        noDocuments: "Aucun document ou réglementation",
        noPositions: "Aucun poste défini",
        noTasks: "Aucune tâche définie",
        documentsTitle: "Documents et Réglementations",
        positionsTitle: "Postes",
        tasksTitle: "Tâches",
        labelDocument: "Document",
        labelRegulation: "Réglementation",
        searchError: "Arbre non initialisé",
        departmentNotFound: "Département non trouvé:",
        noDepartmentFound: "Aucun département trouvé avec le nom ou acronyme:",
        collapseAll: "Tout fermer",
        expandAll: "Tout ouvrir",
        documentsLabel: "Documents",
        positionsLabel: "Postes",
        childCount: "sous-département(s)",
        backButton: "Retour au parent",
        rootLevel: "Niveau racine",
        showChildren: "Afficher les enfants",
        currentLevel: "Niveau actuel",
        backToRoot: "Retour à la racine",
        typeLabels: {
          direction: "Direction",
          operationnel: "Opérationnel",
          commercial: "Commercial",
          support: "Support",
          technique: "Technique",
          formation: "Formation",
          conformite: "Conformité",
          strategique: "Stratégique",
          economique: "Économique",
          organisation: "Organisation",
        },
      },
      en: {
        detailsTitle: "Department Details",
        error: "Error",
        collapseAll: "Collapse all",
        expandAll: "Expand all",
        zoomIn: "Zoom in",
        zoomOut: "Zoom out",
        fitToScreen: "Fit to screen",
        resetView: "Reset view",
        toggleControls: "Hide/Show controls",
        showControls: "Show controls",
        hideControls: "Hide controls",
        close: "Close",
        backToRoot: "Back to root",
        checkProvider: "Check that the provider is accessible.",
        noData: "Data not available",
        companyName: "Airline Company",
        companyDescription: "Organizational structure of the airline company",
        noName: "No name",
        noDescription: "No description",
        undefinedType: "undefined",
        badgeDocs: "Docs",
        badgePositions: "Positions",
        badgeTasks: "Tasks",
        noDocuments: "No documents or regulations",
        noPositions: "No positions defined",
        noTasks: "No tasks defined",
        documentsTitle: "Documents and Regulations",
        positionsTitle: "Positions",
        tasksTitle: "Tasks",
        labelDocument: "Document",
        labelRegulation: "Regulation",
        searchError: "Tree not initialized",
        departmentNotFound: "Department not found:",
        noDepartmentFound: "No department found with name or acronym:",
        collapseAll: "Collapse all",
        expandAll: "Expand all",
        documentsLabel: "Documents",
        positionsLabel: "Positions",
        childCount: "sub-department(s)",
        backButton: "Back to parent",
        rootLevel: "Root level",
        showChildren: "Show children",
        currentLevel: "Current level",
        backToRoot: "Back to root",
        typeLabels: {
          direction: "Direction",
          operationnel: "Operational",
          commercial: "Commercial",
          support: "Support",
          technique: "Technical",
          formation: "Training",
          conformite: "Compliance",
          strategique: "Strategic",
          economique: "Economic",
          organisation: "Organization",
        },
      },
    };
  }
  initialize(
    lng,
    display_mode,
    querySelect,
    queryModal,
    queryDetails,
    bControlsEnabled,
  ) {
    this.lng = lng || "en";
    this.bControlsEnabled = bControlsEnabled;
    this.querySelect = querySelect;
    this.queryModal = queryModal;
    this.queryDetails = queryDetails;
    this.display_mode = display_mode;
    this.init();
    this.initializeChart();
    setTimeout(() => this.applyNavigationZoomToFit(), 220);
  }
  setLang(lng) {
    this.lng = lng || "fr";
    this.updateInterfaceLanguage();
    this.initializeChart();
  }
  updateInterfaceLanguage() {
    const detailsTitle = document.querySelector(".panel-header h3");
    if (detailsTitle) {
      detailsTitle.textContent = this.translate("detailsTitle");
    }
    const closeBtn = document.getElementById("details-panel-close-btn");
    if (closeBtn) {
      closeBtn.title = this.translate("close");
    }
    const errorDiv = document.querySelector("#no-data");
    if (errorDiv && errorDiv.style.display !== "none") {
      errorDiv.textContent = this.translate("noData");
    }
    if (this.root) {
      this.updateTreeLanguage();
    }
  }
  updateTreeLanguage() {
    const nodes = this.gNodes.selectAll("g.node");
    nodes.each((d, i, nodesArray) => {
      const nodeGroup = d3.select(nodesArray[i]);
      this.refreshCard(nodeGroup.select(".node-card"), d);
    });
    this.renderAscendants();
    if (this.pinned && this.activeAnchorEl) {
      const node = this.findNodeById(this.root, this.pinned.id);
      if (node) {
        const nodeData = node.data.data;
        const html =
          this.pinned.type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : this.pinned.type === "proc"
              ? this.renderPostesHTML(nodeData)
              : this.renderTasksHTML(nodeData);
        this.tooltip.html(html);
        this.positionTooltipFor(this.activeAnchorEl);
      }
    }
  }
  translate(key, context = null) {
    if (
      context &&
      this.translations[this.lng] &&
      this.translations[this.lng][context]
    ) {
      const contextObj = this.translations[this.lng][context];
      if (contextObj && contextObj[key]) {
        return contextObj[key];
      }
    }
    if (this.translations[this.lng] && this.translations[this.lng][key]) {
      return this.translations[this.lng][key];
    }
    return key;
  }
  showError(messageError) {
    document.getElementById("main-container-diagramme").innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <h2>${this.translate("error")}</h2>
                <p>${messageError}</p>
                <p>${this.translate("checkProvider")}</p>
            </div>
        `;
  }
  init() {
    let textDetails = "";
    let textheight = `style="height:calc(100vh - 90px);"`;
    if (this.bControlsEnabled == false)
      textheight = `style="height:calc(100vh - 10px);"`;
    if (!this.bModal)
      textDetails = `<div id="details-panel" ${textheight} style="display:none;">
                <div class="panel-header">
                    <h3>${this.translate("detailsTitle")}</h3>
                    <div class="panel-actions">
                        <button id="details-panel-close-btn" class="panel-action-btn" type="button" title="${this.translate("close")}">&times;</button>
                    </div>
                </div>
                <div id="panneau-documents"></div>
            </div>`;
    document.getElementById("main-container-diagramme").innerHTML = `
        <div class="main-container">
            <div id="chart-container">
                <div id="chart" ${textheight}>
                    <div id="no-data" style="display:none">${this.translate("noData")}</div>
                </div>
            </div>
            ${textDetails}
        </div>     
        `;
    if (this.queryDetails) {
      this.queryDetails.init();
    }
    if (!this.bModal) {
      const closeBtn = document.getElementById("details-panel-close-btn");
      const detailsPanel = document.getElementById("details-panel");
      const detailsContainer = document.getElementById("panneau-documents");
      if (detailsPanel) {
        detailsPanel.style.flexDirection = "column";
        detailsPanel.style.minHeight = "0";
        detailsPanel.style.overflow = "hidden";
      }
      if (detailsContainer) {
        detailsContainer.style.flex = "1";
        detailsContainer.style.display = "flex";
        detailsContainer.style.flexDirection = "column";
        detailsContainer.style.minHeight = "0";
        detailsContainer.style.overflow = "hidden";
      }
      const detailsStyleId = "inverse-simplified-details-style";
      if (!document.getElementById(detailsStyleId)) {
        const style = document.createElement("style");
        style.id = detailsStyleId;
        style.textContent = `
                    #details-panel #panneau-documents .department-details {
                        flex: 1;
                        display: flex;
                        flex-direction: column;
                        min-height: 0;
                        height: 100%;
                    }
                    #details-panel #panneau-documents .tab-content {
                        min-height: 100%;
                    }
                    #details-panel #panneau-documents .tab-content-container {
                        flex: 1;
                        min-height: 0;
                        max-height: none;
                        overflow-y: auto;
                    }
                `;
        document.head.appendChild(style);
      }
      if (closeBtn && detailsPanel) {
        closeBtn.addEventListener("click", () => {
          detailsPanel.style.display = "none";
        });
      }
    }
  }
  createScrollbars() {
    const chartContainer = document.getElementById("chart-container");
    if (!chartContainer) return;
    chartContainer
      .querySelectorAll(".zoom-control-panel, .scrollbar-container")
      .forEach((el) => el.remove());
    this.scrollbar.container = d3
      .select("#chart-container")
      .append("div")
      .attr("class", "scrollbar-container");
    this.scrollbar.x = this.scrollbar.container
      .append("div")
      .attr("class", "scrollbar scrollbar-x")
      .call(
        d3
          .drag()
          .on("start", (event) => this.handleScrollbarDragStart(event, "x"))
          .on("drag", (event) => this.handleScrollbarDrag(event, "x"))
          .on("end", () => this.handleScrollbarDragEnd("x")),
      );
    this.scrollbar.y = this.scrollbar.container
      .append("div")
      .attr("class", "scrollbar scrollbar-y")
      .call(
        d3
          .drag()
          .on("start", (event) => this.handleScrollbarDragStart(event, "y"))
          .on("drag", (event) => this.handleScrollbarDrag(event, "y"))
          .on("end", () => this.handleScrollbarDragEnd("y")),
      );
    const controlPanel = this.scrollbar.container
      .append("div")
      .attr("class", "zoom-control-panel")
      .attr("id", "zoom-control-panel");
    controlPanel
      .append("div")
      .attr("class", "drag-handle")
      .attr("title", "Drag handle")
      .html("<span></span><span></span><span></span><span></span><span></span><span></span>");
    const buttonsRow = controlPanel.append("div").attr("class", "buttons-row");
    this.scrollbar.toggleBtn = buttonsRow
      .append("button")
      .attr("class", "zoom-btn toggle-btn")
      .html("\u25C4")
      .attr("title", this.translate("toggleControls"))
      .on("click", (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.toggleControls();
      });
    buttonsRow.append("div").attr("class", "separator");
    this.scrollbar.zoomOutBtn = buttonsRow
      .append("button")
      .attr("class", "zoom-btn zoom-out")
      .html("\u2212")
      .attr("title", this.translate("zoomOut"))
      .on("click", () => this.zoomOut());
    this.scrollbar.zoomLevel = buttonsRow
      .append("div")
      .attr("class", "zoom-level")
      .text("100%");
    this.scrollbar.zoomBtn = buttonsRow
      .append("button")
      .attr("class", "zoom-btn zoom-in")
      .html("+")
      .attr("title", this.translate("zoomIn"))
      .on("click", () => this.zoomIn());
    buttonsRow.append("div").attr("class", "separator");
    this.scrollbar.fitBtn = buttonsRow
      .append("button")
      .attr("class", "zoom-btn fit-btn")
      .html("\u2922")
      .attr("title", this.translate("fitToScreen"))
      .on("click", () => this.fitToScreen(80, true));
    buttonsRow
      .append("button")
      .attr("class", "zoom-btn reset-btn")
      .html("\u2302")
      .attr("title", this.translate("resetView"))
      .on("click", () => this.resetView());
    buttonsRow.append("div").attr("class", "separator");
    buttonsRow
      .append("button")
      .attr("class", "zoom-btn root-btn")
      .html("\u21B6")
      .attr("title", this.translate("backToRoot"))
      .on("click", () => this.navigateToRoot());
    buttonsRow.append("div").attr("class", "separator");
    this.makeZoomPanelDraggable(controlPanel);
    this.updateScrollbars();
  }
  toggleControls() {
    this.scrollbar.isCollapsed = !this.scrollbar.isCollapsed;
    const controlPanel = this.scrollbar.container
      ? this.scrollbar.container.select(".zoom-control-panel")
      : d3.select("#zoom-control-panel");
    if (controlPanel.empty()) return;
    const buttonsRow = controlPanel.select(".buttons-row");
    const toggleBtn = controlPanel.select(".toggle-btn");
    const separators = controlPanel.selectAll(".separator");
    const zoomLevel = controlPanel.select(".zoom-level");
    if (this.scrollbar.isCollapsed) {
      buttonsRow
        .selectAll(".zoom-btn:not(.toggle-btn)")
        .style("display", "none");
      separators.style("display", "none");
      zoomLevel.style("display", "none");
      toggleBtn.html("\u25BA").attr("title", this.translate("showControls"));
      controlPanel.style("padding", "8px 12px");
      controlPanel.style("min-width", "auto");
    } else {
      buttonsRow.selectAll(".zoom-btn").style("display", "flex");
      separators.style("display", "block");
      zoomLevel.style("display", "flex");
      toggleBtn.html("\u25C4").attr("title", this.translate("hideControls"));
      controlPanel.style("padding", "8px 12px");
    }
  }
  setupControlPanelHover() {
    const controlPanel = this.scrollbar.container
      ? this.scrollbar.container.select(".zoom-control-panel")
      : d3.select("#zoom-control-panel");
    if (controlPanel.empty()) return;
    controlPanel
      .on("mouseenter", () => {
        if (this.scrollbar.isCollapsed) {
          const buttonsRow = controlPanel.select(".buttons-row");
          buttonsRow
            .selectAll(".zoom-btn:not(.toggle-btn)")
            .style("display", "flex");
          controlPanel.selectAll(".separator").style("display", "block");
          controlPanel.select(".zoom-level").style("display", "flex");
          controlPanel.style("padding", "8px 12px");
        }
      })
      .on("mouseleave", () => {
        if (this.scrollbar.isCollapsed) {
          const buttonsRow = controlPanel.select(".buttons-row");
          buttonsRow
            .selectAll(".zoom-btn:not(.toggle-btn)")
            .style("display", "none");
          controlPanel.selectAll(".separator").style("display", "none");
          controlPanel.select(".zoom-level").style("display", "none");
          controlPanel.style("padding", "8px 12px");
          controlPanel.style("min-width", "auto");
        }
      });
  }
  makeZoomPanelDraggable(controlPanel) {
    const existingHandle = controlPanel.select(".drag-handle");
    if (existingHandle.empty()) return;
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let initialLeft = 0;
    let initialTop = 0;
    const handleElement = existingHandle.node();
    const dragMoveHandler = (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const newLeft = initialLeft + dx;
      const newTop = initialTop + dy;
      const container = document.getElementById("chart-container");
      const panel = d3.select("#zoom-control-panel").node();
      if (!container || !panel) return;
      const containerRect = container.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const maxLeft = containerRect.width - panelRect.width;
      const maxTop = containerRect.height - panelRect.height;
      const finalLeft = Math.max(0, Math.min(newLeft, maxLeft));
      const finalTop = Math.max(0, Math.min(newTop, maxTop));
      controlPanel
        .style("position", "absolute")
        .style("left", `${finalLeft}px`)
        .style("top", `${finalTop}px`)
        .style("right", "auto")
        .style("bottom", "auto");
    };
    const dragEndHandler = () => {
      isDragging = false;
      controlPanel.classed("dragging", false);
      document.removeEventListener("mousemove", dragMoveHandler);
      document.removeEventListener("mouseup", dragEndHandler);
      this.saveZoomPanelPosition();
    };
    const dragStartHandler = (e) => {
      const panel = d3.select("#zoom-control-panel").node();
      const container = document.getElementById("chart-container");
      if (!panel || !container) return;
      isDragging = true;
      const rect = panel.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      startX = e.clientX;
      startY = e.clientY;
      initialLeft = rect.left - containerRect.left;
      initialTop = rect.top - containerRect.top;
      controlPanel.classed("dragging", true);
      document.addEventListener("mousemove", dragMoveHandler);
      document.addEventListener("mouseup", dragEndHandler);
      e.preventDefault();
    };
    handleElement.addEventListener("mousedown", dragStartHandler);
    handleElement.addEventListener("dblclick", () => {
      controlPanel
        .style("position", "")
        .style("left", "")
        .style("top", "")
        .style("right", "20px")
        .style("bottom", "20px");
      localStorage.removeItem("inverseSimplifiedZoomPanelPosition");
    });
    this.restoreZoomPanelPosition(controlPanel);
  }
  saveZoomPanelPosition() {
    const panel = d3.select("#zoom-control-panel").node();
    const container = document.getElementById("chart-container");
    if (!panel || !container) return;
    const rect = panel.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    const position = {
      left: rect.left - containerRect.left,
      top: rect.top - containerRect.top,
      isAbsolute: panel.style.position === "absolute",
    };
    localStorage.setItem(
      "inverseSimplifiedZoomPanelPosition",
      JSON.stringify(position),
    );
  }
  restoreZoomPanelPosition(controlPanel) {
    const saved = localStorage.getItem("inverseSimplifiedZoomPanelPosition");
    if (!saved) return;
    try {
      const position = JSON.parse(saved);
      if (position.isAbsolute) {
        controlPanel
          .style("position", "absolute")
          .style("left", `${position.left}px`)
          .style("top", `${position.top}px`)
          .style("right", "auto")
          .style("bottom", "auto");
      }
    } catch (error) {
      localStorage.removeItem("inverseSimplifiedZoomPanelPosition");
    }
  }
  handleScrollbarDragStart(event, axis) {
    if (axis === "x") {
      this.scrollbar.isDraggingX = true;
    } else {
      this.scrollbar.isDraggingY = true;
    }
    d3.select(event.sourceEvent.target).classed("dragging", true);
  }
  handleScrollbarDrag(event, axis) {
    if (!this.svg || !this.zoom) return;
    const metrics = this.getScrollbarMetrics();
    if (!metrics) return;
    const { transform, track, thumb, world } = metrics;
    if (axis === "x") {
      const movableTrack = Math.max(1, track.width - thumb.width);
      const worldRange = Math.max(0, world.width - world.visibleWidth);
      if (worldRange <= 0) return;
      const deltaRatio = event.dx / movableTrack;
      const nextViewMinX = Math.max(
        world.minX,
        Math.min(
          world.minX + worldRange,
          -transform.x / transform.k + deltaRatio * worldRange,
        ),
      );
      const newX = -nextViewMinX * transform.k;
      this.svg.call(
        this.zoom.transform,
        d3.zoomIdentity.translate(newX, transform.y).scale(transform.k),
      );
    } else {
      const movableTrack = Math.max(1, track.height - thumb.height);
      const worldRange = Math.max(0, world.height - world.visibleHeight);
      if (worldRange <= 0) return;
      const deltaRatio = event.dy / movableTrack;
      const nextViewMinY = Math.max(
        world.minY,
        Math.min(
          world.minY + worldRange,
          -transform.y / transform.k + deltaRatio * worldRange,
        ),
      );
      const newY = -nextViewMinY * transform.k;
      this.svg.call(
        this.zoom.transform,
        d3.zoomIdentity.translate(transform.x, newY).scale(transform.k),
      );
    }
    this.updateScrollbars();
  }
  handleScrollbarDragEnd(axis) {
    if (axis === "x") {
      this.scrollbar.isDraggingX = false;
    } else {
      this.scrollbar.isDraggingY = false;
    }
    d3.selectAll(".scrollbar").classed("dragging", false);
  }
  updateScrollbars() {
    if (!this.svg || !this.scrollbar.container || !this.root) return;
    const metrics = this.getScrollbarMetrics();
    if (!metrics) return;
    const { transform, world, track, thumb, ui } = metrics;
    const viewMinX = -transform.x / transform.k;
    const viewMinY = -transform.y / transform.k;
    const xRange = Math.max(0, world.width - world.visibleWidth);
    const yRange = Math.max(0, world.height - world.visibleHeight);
    const showX = xRange > 1;
    const showY = yRange > 1;
    const xRatio =
      xRange > 0
        ? Math.max(0, Math.min(1, (viewMinX - world.minX) / xRange))
        : 0;
    const yRatio =
      yRange > 0
        ? Math.max(0, Math.min(1, (viewMinY - world.minY) / yRange))
        : 0;
    const xThumbPos =
      ui.margin + xRatio * Math.max(0, track.width - thumb.width);
    const yThumbPos =
      ui.margin + yRatio * Math.max(0, track.height - thumb.height);
    this.scrollbar.x
      .style("display", showX ? "block" : "none")
      .style("pointer-events", showX ? "all" : "none")
      .style("width", `${thumb.width}px`)
      .style("left", `${xThumbPos}px`)
      .style("bottom", `${ui.margin}px`)
      .style("height", `${ui.thickness}px`);
    this.scrollbar.y
      .style("display", showY ? "block" : "none")
      .style("pointer-events", showY ? "all" : "none")
      .style("height", `${thumb.height}px`)
      .style("top", `${yThumbPos}px`)
      .style("right", `${ui.margin}px`)
      .style("width", `${ui.thickness}px`);
    this.updateZoomLevelDisplay();
  }
  getContentBounds() {
    if (!this.gRoot?.node) return null;
    const bbox = this.gRoot.node().getBBox?.();
    if (!bbox || bbox.width <= 0 || bbox.height <= 0) return null;
    const pad = 24;
    return {
      minX: bbox.x - pad,
      minY: bbox.y - pad,
      maxX: bbox.x + bbox.width + pad,
      maxY: bbox.y + bbox.height + pad,
    };
  }
  getScrollbarMetrics() {
    const host = document.getElementById("chart");
    if (!host || !this.svg) return null;
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width <= 0 || height <= 0) return null;
    const content = this.getContentBounds();
    if (!content) return null;
    const transform = d3.zoomTransform(this.svg.node());
    const contentWidth = Math.max(1, content.maxX - content.minX);
    const contentHeight = Math.max(1, content.maxY - content.minY);
    const visibleWidth = width / Math.max(transform.k, 0.0001);
    const visibleHeight = height / Math.max(transform.k, 0.0001);
    const ui = {
      thickness: 8,
      margin: 4,
      minSize: 40,
    };
    const trackWidth = Math.max(
      1,
      width - ui.margin * 2 - (ui.thickness + ui.margin),
    );
    const trackHeight = Math.max(
      1,
      height - ui.margin * 2 - (ui.thickness + ui.margin),
    );
    const thumbWidth = Math.max(
      ui.minSize,
      Math.min(
        trackWidth,
        trackWidth * Math.min(1, visibleWidth / contentWidth),
      ),
    );
    const thumbHeight = Math.max(
      ui.minSize,
      Math.min(
        trackHeight,
        trackHeight * Math.min(1, visibleHeight / contentHeight),
      ),
    );
    return {
      transform,
      ui,
      track: { width: trackWidth, height: trackHeight },
      thumb: { width: thumbWidth, height: thumbHeight },
      world: {
        minX: content.minX,
        minY: content.minY,
        width: contentWidth,
        height: contentHeight,
        visibleWidth,
        visibleHeight,
      },
    };
  }
  updateZoomLevelDisplay() {
    if (!this.scrollbar.zoomLevel || !this.svg) return;
    const transform = d3.zoomTransform(this.svg.node());
    this.scrollbar.zoomLevel.text(`${Math.round(transform.k * 100)}%`);
  }
  parseXMLToD3(xmlData) {
    if (!xmlData || !xmlData.nodes) {
      console.error(
        "DonnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©es XML non disponibles",
      );
      return null;
    }
    const nodes = xmlData.nodes;
    const nodeMap = new Map();
    const d3Nodes = [];
    for (const node of nodes) {
      const d3Node = {
        id: node.id,
        data: {
          nom: node.nom,
          id: node.id,
          type: node.type,
          abbreviation: node.abbreviation || "",
          abbrev_details: node.abbrev_details || "",
          background_color: node.background_color || "",
          description: node.description || "",
          responsable: node.responsable || "",
          note: node.note || "",
          postes: node.postes || [],
          fichiers: node.fichiers || [],
          tasks: node.tasks || [],
          taskPosteAssociations: node.taskPosteAssociations || new Map(),
          posteTaskAssociations: node.posteTaskAssociations || new Map(),
          xmlElement: node.xmlElement,
        },
        parent: node.parent === "null" || !node.parent ? null : node.parent,
        children: [],
      };
      d3Nodes.push(d3Node);
      nodeMap.set(node.id, d3Node);
    }
    const rootNodes = [];
    for (const node of d3Nodes) {
      if (!node.parent) {
        rootNodes.push(node);
      } else {
        const parentNode = nodeMap.get(node.parent);
        if (parentNode) {
          if (!parentNode.children) parentNode.children = [];
          parentNode.children.push(node);
        } else {
          console.warn(
            `Parent non trouvÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â© pour ${node.id}, traitement comme racine`,
          );
          rootNodes.push(node);
        }
      }
    }
    if (rootNodes.length === 1) {
      return rootNodes[0];
    } else if (rootNodes.length > 1) {
      return {
        id: "root",
        data: {
          nom: this.translate("companyName"),
          id: "ROOT",
          type: "organisation",
          description: this.translate("companyDescription"),
        },
        children: rootNodes,
      };
    } else {
      console.error("Aucun noeud racine trouve");
      return null;
    }
  }
  async initializeChart() {
    const nodata = document.getElementById("no-data");
    if (!this.xmlParser || !this.xmlParser.isloadXML()) {
      if (nodata) nodata.style.display = "flex";
      console.error(
        "XMLParser non initialisÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©",
      );
      return;
    }
    const xmlData = this.xmlParser.data;
    if (!xmlData) {
      if (nodata) nodata.style.display = "flex";
      console.error(
        "DonnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©es XML non disponibles",
      );
      return;
    }
    this.dataRef = this.parseXMLToD3(xmlData);
    if (!this.dataRef) {
      if (nodata) nodata.style.display = "flex";
      console.error(
        "Erreur lors de la conversion des donnÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©es XML",
      );
      return;
    }
    if (nodata) nodata.style.display = "none";
    this.startOrgChart(this.dataRef);
  }
  startOrgChart(dataRef) {
    const host = document.getElementById("chart");
    host.innerHTML = "";
    this.svg = d3
      .select(host)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");
    this.gRoot = this.svg.append("g");
    this.gAscendants = this.gRoot.append("g").attr("class", "ascendants");
    this.gMainTree = this.gRoot.append("g").attr("class", "main-tree");
    this.gLinksHalo = this.gMainTree.append("g").attr("class", "links-halo");
    this.gLinks = this.gMainTree.append("g").attr("class", "links");
    this.gNodes = this.gMainTree.append("g").attr("class", "nodes");
    this.tooltip = d3
      .select("#chart")
      .append("div")
      .attr("class", "attr-tooltip");
    this.createScrollbars();
    this.setupControlPanelHover();
    this.setupEventHandlers();
    this.currentRootNode = null;
    this.renderTree(dataRef);
    const detailsPanel = document.getElementById("details-panel");
    if (!this.bModal && detailsPanel) {
      detailsPanel.style.display = "none";
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.autoFit();
        this.updateScrollbars();
      });
    });
  }
  handleScrollbarDragStart(event, axis) {
    if (axis === "x") {
      this.scrollbar.isDraggingX = true;
    } else {
      this.scrollbar.isDraggingY = true;
    }
    d3.select(event.sourceEvent.target).classed("dragging", true);
  }
  zoomIn() {
    if (!this.svg || !this.zoom) return;
    const transform = d3.zoomTransform(this.svg.node());
    const newScale = Math.min(2.6, transform.k * 1.2);
    const newTransform = d3.zoomIdentity
      .translate(transform.x, transform.y)
      .scale(newScale);
    this.svg.transition().duration(300).call(this.zoom.transform, newTransform);
  }
  zoomOut() {
    if (!this.svg || !this.zoom) return;
    const transform = d3.zoomTransform(this.svg.node());
    const newScale = Math.max(0.2, transform.k / 1.2);
    const newTransform = d3.zoomIdentity
      .translate(transform.x, transform.y)
      .scale(newScale);
    this.svg.transition().duration(300).call(this.zoom.transform, newTransform);
  }
  resetView() {
    if (this.HOME) {
      this.applyTransform(this.HOME);
    } else {
      this.fitToScreen(80, true);
    }
  }
  setupEventHandlers() {
    this.zoom = d3
      .zoom()
      .scaleExtent([0.2, 2.6])
      .on("zoom", (ev) => {
        this.gRoot.attr("transform", ev.transform);
        this.followAnchor();
        this.updateScrollbars(); 
      });
    this.svg.call(this.zoom);
    this.svg.on("dblclick.zoom", null);
    this.tooltip
      .on("mouseenter", (ev) => {
        this.hoverOnTooltip = true;
        this.cancelHideTimer();
      })
      .on("mouseleave", (ev) => {
        this.hoverOnTooltip = false;
        if (!this.pinned) this.scheduleHide(140);
      });
    window.addEventListener("resize", () => {
      this.updateScrollbars();
    });
  }
  renderTree(dataRef) {
    const tree = d3
      .tree()
      .nodeSize([this.TREE_ORIENTATION.dx, this.TREE_ORIENTATION.dy])
      .separation(this.TREE_ORIENTATION.separation);
    this.tree = tree;
    if (!this.fullRoot || this.fullRoot.data !== dataRef) {
      this.fullRoot = d3.hierarchy(dataRef);
    }
    let displayRoot;
    if (this.currentRootNode) {
      displayRoot = this.currentRootNode;
    } else {
      displayRoot = this.fullRoot;
      this.currentRootNode = displayRoot;
    }
    this.root = displayRoot;
    if (this.currentRootNode._children && !this.currentRootNode.children) {
      this.currentRootNode.children = this.currentRootNode._children;
      this.currentRootNode._children = null;
    }
    this.root.descendants().forEach((d) => {
      if (d === this.currentRootNode) return;
      if (this.currentRootNode && d.parent === this.currentRootNode) {
        if (d.children && d.children.length > 0) {
          d._children = d.children;
          d.children = null;
        }
      } else if (d.depth > 0) {
        d._children = d.children;
        d.children = null;
      }
    });
    this.renderAscendants();
    const ascendantsHeight = this.calculateAscendantsHeight();
    const verticalOffset = 0;
    this.gMainTree.attr("transform", `translate(0, ${verticalOffset})`);
    this.update(this.root);
  }
  navigateToRoot() {
    this.currentRootNode = null;
    this.renderTree(this.dataRef);
    this.applyNavigationZoomToFit();
  }
  renderAscendants() {
    this.gAscendants.selectAll("*").remove();
    if (!this.currentRootNode) {
      return;
    }
    const ancestors = [];
    let node = this.currentRootNode;
    while (node && node.parent) {
      ancestors.unshift(node.parent); 
      node = node.parent;
    }
    if (ancestors.length === 0) {
      return;
    }
    const nodeWidth = 240;
    const nodeHeight = 70;
    const verticalSpacing = 100;
    const startX = 50;
    const startY = 50;
    ancestors.forEach((ancestor, index) => {
      const yPos = startY + index * verticalSpacing;
      const nodeGroup = this.gAscendants
        .append("g")
        .attr("class", "ascendant-node node")
        .attr("transform", `translate(${startX}, ${yPos})`)
        .style("cursor", "pointer")
        .on("click", (event) => {
          event.stopPropagation();
          this.navigateToNode(ancestor);
        });
      const isGlobalRoot = ancestor.depth === 0;
      this.createAscendantCard(
        nodeGroup,
        ancestor,
        nodeWidth,
        nodeHeight,
        false,
        isGlobalRoot,
      );
      if (index < ancestors.length - 1) {
        this.gAscendants
          .append("path")
          .attr("class", "ascendant-link")
          .attr(
            "d",
            `M ${startX + nodeWidth / 2},${yPos + nodeHeight} 
                            V ${yPos + verticalSpacing - 20}`,
          )
          .attr("stroke", isGlobalRoot ? this.nodeColor(ancestor) : "#cbd5e1")
          .attr("stroke-width", isGlobalRoot ? 2 : 1.5)
          .attr("fill", "none")
          .attr("stroke-dasharray", isGlobalRoot ? "none" : "5,5");
      }
    });
    if (ancestors.length > 0) {
      const lastY = startY + (ancestors.length - 1) * verticalSpacing;
      this.gAscendants
        .append("path")
        .attr("class", "link-to-tree")
        .attr(
          "d",
          `M ${startX + nodeWidth / 2},${lastY + nodeHeight} 
                        V ${lastY + nodeHeight + 50}`,
        )
        .attr("stroke", this.nodeColor(this.currentRootNode))
        .attr("stroke-width", 1.5)
        .attr("fill", "none")
        .attr("stroke-dasharray", "5,5");
    }
  }
  getFullPathToRoot(node) {
    const path = [];
    let currentNode = node;
    while (currentNode) {
      path.unshift(currentNode); 
      currentNode = currentNode.parent;
    }
    return path;
  }
  createAscendantCard(
    container,
    nodeData,
    width,
    height,
    isCurrent = false,
    isRoot = false,
  ) {
    const nodeGroup = container.append("g").attr("class", "node-card");
    const data = nodeData.data.data;
    const nom = data.nom || this.translate("noName");
    const normalizedBackground = this.normalizeHexColor(data.background_color);
    const contrastText = normalizedBackground
      ? this.getContrastTextColor(normalizedBackground)
      : "#1e293b";
    const contrastSub = normalizedBackground
      ? this.getSecondaryTextColor(normalizedBackground)
      : "#64748b";
    let backgroundColor, borderColor, textColor, subTextColor, acrColor;
    if (isRoot) {
      backgroundColor = normalizedBackground || "#ffffff";
      borderColor = this.nodeColor(nodeData);
      textColor = normalizedBackground ? contrastText : "#1e293b";
      subTextColor = normalizedBackground ? contrastSub : "#64748b";
      acrColor = normalizedBackground ? contrastSub : "#3b82f6";
    } else {
      backgroundColor = normalizedBackground || "#f8fafc";
      borderColor = normalizedBackground ? this.nodeColor(nodeData) : "#cbd5e1";
      textColor = normalizedBackground ? contrastText : "#64748b";
      subTextColor = normalizedBackground ? contrastSub : "#94a3b8";
      acrColor = normalizedBackground ? contrastSub : "#94a3b8";
    }
    nodeGroup
      .append("rect")
      .attr("x", 0)
      .attr("y", -height / 2)
      .attr("width", width)
      .attr("height", height)
      .attr("rx", 8)
      .attr("ry", 8)
      .attr("stroke", borderColor)
      .attr("stroke-width", isRoot ? 2 : 1.5)
      .style(
        "fill",
        backgroundColor,
        normalizedBackground ? "important" : null,
      );
    nodeGroup
      .append("text")
      .attr("x", width / 2)
      .attr("y", -height / 2 + 25)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-size", "14px")
      .attr("font-weight", isRoot ? "700" : "600")
      .style("fill", textColor, normalizedBackground ? "important" : null)
      .text(nom.length > 30 ? nom.substring(0, 30) + "..." : nom);
    const acr = this.getAbrev(data);
    if (acr) {
      nodeGroup
        .append("text")
        .attr("x", width - 10)
        .attr("y", -height / 2 + 25)
        .attr("text-anchor", "end")
        .attr("fill", acrColor)
        .attr("font-size", "12px")
        .attr("font-weight", "600")
        .text(acr);
    }
    const depth = nodeData.depth || 0;
    nodeGroup
      .append("circle")
      .attr("cx", 15)
      .attr("cy", -height / 2 + 60)
      .attr("r", 8)
      .attr(
        "fill",
        isRoot
          ? this.nodeColor(nodeData)
          : normalizedBackground
            ? this.nodeColor(nodeData)
            : "#cbd5e1",
      );
    nodeGroup
      .append("text")
      .attr("x", 15)
      .attr("y", -height / 2 + 60)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("fill", "#ffffff")
      .attr("font-size", "10px")
      .attr("font-weight", "600")
      .text(depth + 1);
    if (isRoot) {
      nodeGroup
        .append("text")
        .attr("x", width - 10)
        .attr("y", -height / 2 + 45)
        .attr("text-anchor", "end")
        .attr("fill", "#22c55e")
        .attr("font-size", "11px")
        .attr("font-weight", "600")
        .text(this.lng === "fr" ? "Racine" : "Root");
    }
  }
  calculateAscendantsHeight() {
    if (!this.currentRootNode) {
      return 0;
    }
    const ancestors = [];
    let node = this.currentRootNode;
    while (node && node.parent) {
      ancestors.unshift(node.parent);
      node = node.parent;
    }
    if (ancestors.length === 0) {
      return 0;
    }
    const verticalSpacing = 20;
    const height = ancestors.length * verticalSpacing + 20;
    return height;
  }
  update(source) {
    this.tree(this.root);
    this.applyCompactChildrenClusterLayout();
    const nodes = this.root.descendants();
    const links = this.root.links();
    const linkKey = (d) =>
      d.target.data.id ||
      (d.target.data.id = Math.random().toString(36).slice(2));
    const linkHalo = this.gLinksHalo.selectAll("path").data(links, linkKey);
    linkHalo
      .enter()
      .append("path")
      .attr("class", "link-halo")
      .attr("d", (_) => this.getLinkPath({ source: source, target: source }))
      .merge(linkHalo)
      .transition()
      .duration(420)
      .attr("d", (d) => this.getLinkPath(d));
    linkHalo
      .exit()
      .transition()
      .duration(250)
      .attr("d", (_) => this.elbow(source, source))
      .remove();
    const link = this.gLinks.selectAll("path").data(links, linkKey);
    link
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("stroke", (d) => this.nodeColor(d.source))
      .attr("d", (_) => this.getLinkPath({ source: source, target: source }))
      .merge(link)
      .transition()
      .duration(420)
      .attr("stroke", (d) => this.nodeColor(d.source))
      .attr("d", (d) => this.getLinkPath(d));
    link.exit().transition().duration(250).remove();
    const nodeSel = this.gNodes
      .selectAll("g.node")
      .data(nodes, (d) => d.data.id);
    const enter = nodeSel
      .enter()
      .append("g")
      .attr("class", "node")
      .style("opacity", 0);
    const card = enter.append("g").attr("class", "node-card");
    card.append("rect").attr("class", "node-rect");
    card.append("text").attr("class", "node-title");
    card.append("text").attr("class", "node-sub");
    card.append("path").attr("class", "toggle");
    card.append("rect").attr("class", "hit");
    const badge = card.append("g").attr("class", "badge");
    badge.append("rect").attr("class", "badge-bg");
    badge.append("text").attr("class", "badge-text");
    const countG = badge.append("g").attr("class", "count-pill");
    countG.append("rect").attr("rx", 7).attr("ry", 7);
    countG.append("text").attr("class", "count-tx");
    const typeBadge = card.append("g").attr("class", "type-badge");
    typeBadge.append("rect");
    typeBadge.append("text");
    if (!this.bModal)
      enter.on("click", (ev, d) => {
        ev.stopPropagation();
        this.showDepartmentDetails(d);
      });
    if (!this.bModal) {
      enter.on("dblclick", (ev, d) => {
        ev.stopPropagation();
        ev.preventDefault();
        const detailsPanel = document.getElementById("details-panel");
        if (detailsPanel && detailsPanel.style.display === "none") {
          detailsPanel.style.display = "flex";
          this.showDepartmentDetails(d);
        }
      });
    }
    enter.each((d, i, nodes) => {
      this.refreshCard(d3.select(nodes[i]).select(".node-card"), d);
    });
    const merged = enter.merge(nodeSel);
    merged.each((d, i, nodes) => {
      this.refreshCard(d3.select(nodes[i]).select(".node-card"), d);
    });
    merged.on("click", (ev, d) => {
      ev.stopPropagation();
      this.showDepartmentDetails(d);
    });
    if (!this.bModal) {
      merged.on("dblclick", (ev, d) => {
        ev.stopPropagation();
        ev.preventDefault();
        const detailsPanel = document.getElementById("details-panel");
        if (detailsPanel && detailsPanel.style.display === "none") {
          detailsPanel.style.display = "flex";
          this.showDepartmentDetails(d);
        }
      });
    }
    merged.selectAll(".toggle-hit-area").on("click", (ev, d) => {
      ev.stopPropagation();
      this.navigateToNode(d);
    });
    merged
      .transition()
      .duration(420)
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("opacity", 1);
    nodeSel
      .exit()
      .transition()
      .duration(250)
      .attr("transform", `translate(${source.x},${source.y})`)
      .style("opacity", 0)
      .remove();
    this.root.descendants().forEach((d) => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }
  applyCompactChildrenClusterLayout() {
    if (!this.root) return;
    const children = this.root.children || [];
    if (children.length <= 6) return;
    const host = document.getElementById("chart");
    const availableWidth = host ? Math.max(640, host.clientWidth - 80) : 1200;
    const estimatedCardWidth =
      children.reduce((maxW, child) => {
        const childWidth =
          child && child._box && child._box.w ? child._box.w : 280;
        return Math.max(maxW, childWidth);
      }, 260) + 24;
    const horizontalGap = 52;
    const rowGap = 180;
    const maxPerRow = 6;
    const centerCorridor = Math.max(110, Math.round(estimatedCardWidth * 0.55));
    const rootX = this.root.x || 0;
    const startY = (this.root.y || 0) + this.TREE_ORIENTATION.dy;
    children.forEach((child, index) => {
      const row = Math.floor(index / maxPerRow);
      const col = index % maxPerRow;
      const rowStartIndex = row * maxPerRow;
      const rowCount = Math.min(maxPerRow, children.length - rowStartIndex);
      const rowWidth =
        rowCount * estimatedCardWidth +
        (rowCount - 1) * horizontalGap +
        (rowCount > 1 ? centerCorridor : 0);
      const rowStartX = rootX - rowWidth / 2 + estimatedCardWidth / 2;
      const leftCount = Math.ceil(rowCount / 2);
      const centerOffset = col >= leftCount ? centerCorridor : 0;
      const rowY = startY + row * rowGap;
      const rowToRowDelta = rowGap;
      const rowBranchY = rowY - rowToRowDelta / 2;
      child.x =
        rowStartX + col * (estimatedCardWidth + horizontalGap) + centerOffset;
      child.y = rowY;
      child._clusterRow = row;
      child._clusterCol = col;
      child._clusterBranchY = rowBranchY;
    });
  }
  navigateToNode(targetNode) {
    if (!targetNode) return null;
    this.currentRootNode = targetNode;
    this.renderTree(this.dataRef);
    const displayedNode =
      this.findNodeById(this.root, targetNode.data.id) || targetNode;
    this.applyNavigationZoomToFit();
    if (!this.bModal) this.showDepartmentDetails(displayedNode);
    return displayedNode;
  }
  applyNavigationZoomToFit() {
    const runFit = () => {
      this.fitToScreen(80, true);
      this.updateScrollbars();
    };
    requestAnimationFrame(() => {
      requestAnimationFrame(runFit);
    });
    setTimeout(runFit, 180);
    setTimeout(runFit, 360);
  }
  showDepartmentDetails(node) {
    const detailsPanel = document.getElementById("details-panel");
    if (!this.bModal && detailsPanel && detailsPanel.style.display === "none") {
      detailsPanel.style.display = "flex";
    }
    if (this.selectedNode) {
      const prevNodeGroup = this.gNodes
        .selectAll("g.node")
        .filter((n) => n.data.id === this.selectedNode.data.id);
      prevNodeGroup.classed("selected", false);
      this.gAscendants
        .selectAll(".ascendant-node.selected")
        .classed("selected", false);
      this.gAscendants
        .selectAll(".current-node.selected")
        .classed("selected", false);
    }
    this.selectedNode = node;
    const nodeGroup = this.gNodes
      .selectAll("g.node")
      .filter((n) => n.data.id === node.data.id);
    nodeGroup.classed("selected", true);
    if (this.currentRootNode && node.data.id === this.currentRootNode.data.id) {
      this.gAscendants.selectAll(".current-node").classed("selected", true);
    } else {
      if (
        this.gAscendants != null &&
        this.gAscendants.selectAll(".ascendant-node") != null
      ) {
        const ascendantGroup = this.gAscendants
          .selectAll(".ascendant-node")
          .filter((d, i, nodes) => {
            const g = d3.select(nodes[i]);
            const nodeData = g.datum();
            if (nodeData == null) return null;
            return nodeData.data.id === node.data.id;
          });
        if (ascendantGroup != null) ascendantGroup.classed("selected", true);
      }
    }
    if (this.querySelect != null) {
      this.querySelect.updateDepartmentSelect(node.data.id);
    }
    if (this.queryDetails != null) {
      this.queryDetails.showDepartmentDetailsId(node.data.id);
    }
  }
  resetToGlobalRoot() {
    this.currentRootNode = null;
    this.renderTree(this.dataRef);
  }
  getAbrev(d) {
    const abbreviation = d?.data?.data?.abbreviation;
    if (abbreviation && abbreviation.trim() !== "") {
      return abbreviation.trim();
    }
    const abbrevDetails = d?.data?.data?.abbrev_details;
    if (abbrevDetails && abbrevDetails.trim() !== "") {
      return abbrevDetails.trim();
    }
    return "";
  }
  refreshCard(selection, d) {
    const nodeData = d.data.data;
    const nom = nodeData.nom || this.translate("noName");
    const truncateText = (text, maxWidth, fontSize = 16) => {
      if (!text) return "";
      const textElement = selection
        .append("text")
        .attr("font-size", `${fontSize}px`)
        .attr("font-weight", "600")
        .attr("visibility", "hidden")
        .text(text);
      const textWidth = textElement.node().getComputedTextLength();
      textElement.remove();
      if (textWidth <= maxWidth) return text;
      let low = 0;
      let high = text.length;
      let result = "...";
      while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        const testText = text.substring(0, mid) + "...";
        const testElement = selection
          .append("text")
          .attr("font-size", `${fontSize}px`)
          .attr("font-weight", "600")
          .attr("visibility", "hidden")
          .text(testText);
        const testWidth = testElement.node().getComputedTextLength();
        testElement.remove();
        if (testWidth <= maxWidth) {
          result = testText;
          low = mid + 1;
        } else {
          high = mid - 1;
        }
      }
      return result;
    };
    const titleH = 16;
    selection.select(".node-sub").text("");
    const kids = this.dataKidsCount(d);
    const acr = this.getAbrev(d);
    let pillW = 0,
      pillH = 16;
    const fichiers = this.getFichiersArrayFromData(nodeData);
    const postes = this.getPostesArrayFromData(nodeData);
    const tasks = this.getTasksArrayFromData(nodeData);
    selection.selectAll(".attr-badge").remove();
    selection.selectAll(".proc-badge").remove();
    selection.selectAll(".task-badge").remove();
    let wFichier = 0,
      wPoste = 0,
      wTask = 0;
    let fichierG = null,
      posteG = null,
      taskG = null;
    if (this.showToolBadges && this.blBadgeDocs && fichiers.length > 0) {
      fichierG = selection
        .append("g")
        .attr("class", "attr-badge")
        .attr("tabindex", 0);
      const labelFichier = `Doc(${fichiers.length})`;
      const tmpA = fichierG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelFichier)
        .attr("visibility", "hidden");
      wFichier = Math.ceil(tmpA.node().getComputedTextLength()) + 14;
      tmpA.remove();
      fichierG
        .append("rect")
        .attr("width", wFichier)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      fichierG
        .append("text")
        .attr("x", wFichier / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelFichier);
    }
    if (this.showToolBadges && this.blBadgePosts && postes.length > 0) {
      posteG = selection
        .append("g")
        .attr("class", "proc-badge")
        .attr("tabindex", 0);
      const labelPoste = `Post(${postes.length})`;
      const tmpP = posteG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelPoste)
        .attr("visibility", "hidden");
      wPoste = Math.ceil(tmpP.node().getComputedTextLength()) + 14;
      tmpP.remove();
      posteG
        .append("rect")
        .attr("width", wPoste)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      posteG
        .append("text")
        .attr("x", wPoste / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelPoste);
    }
    if (this.showToolBadges && this.blBadgeTasks && tasks.length > 0) {
      taskG = selection
        .append("g")
        .attr("class", "task-badge")
        .attr("tabindex", 0);
      const labelTask = `Task(${tasks.length})`;
      const tmpT = taskG
        .append("text")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelTask)
        .attr("visibility", "hidden");
      wTask = Math.ceil(tmpT.node().getComputedTextLength()) + 14;
      tmpT.remove();
      taskG
        .append("rect")
        .attr("width", wTask)
        .attr("height", 20)
        .attr("rx", 10)
        .attr("ry", 10)
        .attr("fill", "#0e0622");
      taskG
        .append("text")
        .attr("x", wTask / 2)
        .attr("y", 12)
        .attr("text-anchor", "middle")
        .attr("fill", "#fff")
        .attr("font-size", 11)
        .attr("font-weight", 700)
        .text(labelTask);
    }
    const gap = 6,
      marginSide = 8;
    const baseContentW = this.MAX_TEXT_W + this.PAD_X * 2 + 32;
    let contentW = baseContentW;
    if (this.showToolBadges) {
      const badgesTotal =
        (taskG ? wTask : 0) +
        (fichierG ? (taskG ? gap : 0) + wFichier : 0) +
        (posteG ? (taskG || fichierG ? gap : 0) + wPoste : 0) +
        (posteG || fichierG || taskG ? gap : 0);
      const neededW = marginSide + badgesTotal + marginSide;
      contentW = Math.max(baseContentW, neededW);
    }
    const blockH = Math.max(48 + titleH + 12, 54);
    const normalizedBackground = this.normalizeHexColor(
      nodeData.background_color,
    );
    const titleColor = normalizedBackground
      ? this.getContrastTextColor(normalizedBackground)
      : "var(--text-primary)";
    const subColor = normalizedBackground
      ? this.getSecondaryTextColor(normalizedBackground)
      : "var(--text-secondary)";
    selection
      .select(".node-rect")
      .attr("x", 0)
      .attr("y", -blockH / 2)
      .attr("width", contentW)
      .attr("height", blockH)
      .attr("stroke", this.nodeColor(d))
      .attr("stroke-width", 1.5)
      .attr("rx", 8)
      .attr("ry", 8)
      .style(
        "fill",
        normalizedBackground || null,
        normalizedBackground ? "important" : null,
      );
    selection
      .select(".node-title")
      .attr("x", contentW / 2)
      .attr("y", 0)
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "middle")
      .attr("font-weight", "600")
      .attr("font-size", "16px")
      .style("fill", titleColor, normalizedBackground ? "important" : null)
      .text(truncateText(nom, Math.max(20, contentW - this.PAD_X * 2), 16));
    selection
      .select(".node-sub")
      .attr("x", this.PAD_X)
      .attr("y", -blockH / 2 + 24 + titleH + 4)
      .attr("fill", subColor)
      .attr("font-size", "12px");
    selection
      .select(".hit")
      .attr("x", -10)
      .attr("y", -blockH / 2 - 6)
      .attr("width", contentW + 20)
      .attr("height", blockH + 12)
      .attr("fill", "transparent");
    if (acr && this.blBadgeAbbrev) {
      const typeG = selection.select(".type-badge");
      const typeTextEl = typeG.select("text").text(acr); 
      const typeTextW = Math.max(12, typeTextEl.node().getComputedTextLength());
      const typeW = typeTextW + 8;
      typeG
        .select("rect")
        .attr("x", 4)
        .attr("y", -blockH / 2 + 4)
        .attr("width", typeW)
        .attr("height", 16)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", this.nodeColor(d))
        .attr("opacity", 0.9);
      typeG
        .select("text")
        .attr("x", 4 + typeW / 2)
        .attr("y", -blockH / 2 + 15)
        .attr("text-anchor", "middle")
        .attr("fill", "#ffffff")
        .attr("font-size", "9px")
        .attr("font-weight", "600")
        .text(acr); 
    }
    const cxToggle = contentW / 2;
    const cyToggle = blockH / 2 - 10;
    const hasAnyChildrenInSimplifiedMode = () => {
      if (d === this.currentRootNode) {
        return d.children && d.children.length > 0;
      }
      if (this.currentRootNode && d.parent === this.currentRootNode) {
        return d._children && d._children.length > 0;
      }
      return (
        (d.children && d.children.length > 0) ||
        (d._children && d._children.length > 0)
      );
    };
    const hasAnyChildren = hasAnyChildrenInSimplifiedMode();
    selection
      .select(".toggle")
      .attr(
        "d",
        `M ${cxToggle - 6},${cyToggle - 3} L ${cxToggle},${cyToggle + 3} L ${cxToggle + 6},${cyToggle - 3} Z`,
      )
      .attr("fill", normalizedBackground ? subColor : "#64748b")
      .style("display", hasAnyChildren ? null : "none");
    selection.selectAll(".toggle-hit-area").remove();
    const toggleHitArea = selection
      .append("rect")
      .attr("class", "toggle-hit-area")
      .attr("x", cxToggle - 12)
      .attr("y", cyToggle - 12)
      .attr("width", 24)
      .attr("height", 24)
      .attr("fill", "transparent")
      .style("display", hasAnyChildren ? null : "none")
      .style("cursor", "pointer");
    if (this.showToolBadges) {
       let startX = contentW - marginSide;
      if (taskG) {
        startX -= wTask;
        taskG.attr("transform", `translate(${startX},${-blockH / 2 -10})`);
        startX -= gap;
      }
      if (fichierG) {
        startX -= wFichier;
        fichierG.attr("transform", `translate(${startX},${-blockH / 2 -10})`);
        startX -= gap;
      }
      if (posteG) {
        startX -= wPoste;
        posteG.attr("transform", `translate(${startX},${-blockH / 2 -10})`);
      }
      this.bindBadgeEvents(posteG, d, "proc", nodeData);
      this.bindBadgeEvents(fichierG, d, "attr", nodeData);
      this.bindBadgeEvents(taskG, d, "task", nodeData);
    }
    d._box = { w: contentW, h: blockH };
  }
  wrap(sel, text, maxWidth) {
    if (!text) return 0;
    const words = text.split(/\s+/).filter(Boolean);
    sel.text(null);
    let line = [],
      lineNumber = 0;
    let tspan = sel
      .append("tspan")
      .attr("x", this.PAD_X)
      .attr("y", 15)
      .attr("dy", 0);
    for (let i = 0; i < words.length; i++) {
      const testLine = line.concat(words[i]).join(" ");
      tspan.text(testLine);
      if (tspan.node().getComputedTextLength() > maxWidth && line.length > 0) {
        line.pop();
        tspan.text(line.join(" "));
        line = [words[i]];
        tspan = sel
          .append("tspan")
          .attr("x", this.PAD_X)
          .attr("dy", 16)
          .text(words[i]);
        lineNumber++;
      } else {
        line.push(words[i]);
      }
    }
    return lineNumber + 1;
  }
  getAcr(d) {
    return (d?.data?.id ?? "").toString().trim();
  }
  dataKidsCount(d) {
    return Array.isArray(d.children || d._children || [])
      ? (d.children || d._children || []).length
      : 0;
  }
  hasDataKids(d) {
    const children = d.children || d._children || [];
    return Array.isArray(children) ? children.length > 0 : 0;
  }
  getFichiersArrayFromData(data) {
    return data?.fichiers || [];
  }
  getPostesArrayFromData(data) {
    return data?.postes || [];
  }
  getTasksArrayFromData(data) {
    return data?.tasks || [];
  }
  normalizeHexColor(value) {
    if (!value || typeof value !== "string") return "";
    const raw = value.trim();
    if (!raw) return "";
    const hex = raw.startsWith("#") ? raw : `#${raw}`;
    return /^#([0-9a-fA-F]{6})$/.test(hex) ? hex.toUpperCase() : "";
  }
  getContrastTextColor(hexColor) {
    const hex = this.normalizeHexColor(hexColor);
    if (!hex) return "#1e293b";
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 140 ? "#0F172A" : "#F8FAFC";
  }
  getSecondaryTextColor(hexColor) {
    const primary = this.getContrastTextColor(hexColor);
    return primary === "#F8FAFC" ? "rgba(248,250,252,0.85)" : "#64748b";
  }
  nodeColor(d) {
    const typeColors = {
      direction: "#1a3a8f",
      operationnel: "#16a34a",
      commercial: "#8b5cf6",
      technique: "#f59e0b",
      formation: "#ec4899",
      support: "#64748b",
      strategique: "#14b8a6",
      conformite: "#ef4444",
      economique: "#f97316",
    };
    return typeColors[d.data.data.type] || "#1a3a8f";
  }
  rightX(d) {
    return (
      d.y + ((d._box && d._box.w) || this.MAX_TEXT_W + this.PAD_X * 2 + 32)
    );
  }
  leftX(d) {
    return d.y;
  }
  elbow(s, t) {
    const sx = this.rightX(s),
      sy = s.x;
    const tx = this.leftX(t),
      ty = t.x;
    const mx = (sx + tx) / 2;
    return `M ${sx},${sy} C ${mx},${sy} ${mx},${ty} ${tx},${ty}`;
  }
  getLinkPath(d) {
    const sx = d.source.x + (this.rightX(d.source) - this.leftX(d.source)) / 2;
    const sy = d.source.y + 45;
    const tx = d.target.x + (this.rightX(d.target) - this.leftX(d.target)) / 2;
    const ty = d.target.y;
    const sourceIsCurrentRoot = d.source === this.root;
    const rootChildrenCount =
      this.root && this.root.children ? this.root.children.length : 0;
    if (sourceIsCurrentRoot && rootChildrenCount > 6) {
      const preferredBranchY = Number.isFinite(d.target?._clusterBranchY)
        ? d.target._clusterBranchY
        : ty - 28;
      const minBranchY = sy + 16;
      const maxBranchY = ty - 16;
      const branchY = Math.max(
        minBranchY,
        Math.min(maxBranchY, preferredBranchY),
      );
      return `M ${sx} ${sy} V${branchY} H${tx} V${ty}`;
    }
    return `M ${sx} ${sy} V${(sy + ty) / 2} H${tx} V${ty}`;
  }
  cancelHideTimer() {
    if (this.hideTimer) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
  scheduleHide(delay = 160) {
    this.cancelHideTimer();
    this.hideTimer = setTimeout(() => {
      if (!this.pinned && !this.hoverOnTooltip) this.hideTooltip();
    }, delay);
  }
  hideTooltip() {
    this.tooltip.style("display", "none").html("");
    this.activeAnchorEl = null;
    this.cancelHideTimer();
  }
  clearPinned() {
    this.pinned = null;
    d3.selectAll(".attr-badge,.proc-badge,.task-badge").classed(
      "pinned",
      false,
    );
    this.hideTooltip();
  }
  setTooltip(html, anchorEl, makePinned) {
    this.tooltip.html(html).style("display", "block");
    this.activeAnchorEl = anchorEl || null;
    this.positionTooltipFor(anchorEl);
    if (makePinned) {
      d3.select(anchorEl).classed("pinned", true);
      this.pinned = {
        id: anchorEl.getAttribute("data-key").split("|")[0],
        type: anchorEl.getAttribute("data-key").split("|")[1],
      };
    }
  }
  positionTooltipFor(anchorEl) {
    if (!anchorEl || !anchorEl.getBoundingClientRect) return this.hideTooltip();
    const wrap = document.getElementById("chart").getBoundingClientRect();
    const r = anchorEl.getBoundingClientRect();
    const left = r.left - wrap.left;
    const top = r.bottom - wrap.top + 8;
    this.tooltip
      .style("left", Math.round(left) + "px")
      .style("top", Math.round(top) + "px");
  }
  followAnchor() {
    if (!this.tooltipVisible()) return;
    let anchor = this.activeAnchorEl;
    if (this.pinned) {
      anchor = this.getBadgeEl(this.pinned.id, this.pinned.type);
    }
    if (!anchor || !document.contains(anchor)) {
      this.clearPinned();
      return;
    }
    this.positionTooltipFor(anchor);
  }
  tooltipVisible() {
    return this.tooltip.style("display") !== "none";
  }
  getBadgeEl(id, type) {
    const g = this.gNodes.selectAll("g.node").filter((n) => n.data.id === id);
    if (g.empty()) return null;
    let sel;
    if (type === "attr") {
      sel = g.select("g.attr-badge");
    } else if (type === "proc") {
      sel = g.select("g.proc-badge");
    } else {
      sel = g.select("g.task-badge");
    }
    return sel.empty() ? null : sel.node();
  }
  bindBadgeEvents(sel, d, type, nodeData) {
    if (!sel || sel.empty()) return;
    const key = `${d.data.id}|${type}`;
    sel
      .attr("data-key", key)
      .on("mouseenter", (evt) => {
        evt.stopPropagation();
        this.cancelHideTimer();
        if (!this.showToolBadges) return;
        if (
          this.pinned &&
          !(this.pinned.id === d.data.id && this.pinned.type === type)
        )
          return;
        const html =
          type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : type === "proc"
              ? this.renderPostesHTML(nodeData)
              : this.renderTasksHTML(nodeData);
        this.setTooltip(html, evt.currentTarget, false);
      })
      .on("mouseleave", (evt) => {
        evt.stopPropagation();
        if (
          this.pinned &&
          this.pinned.id === d.data.id &&
          this.pinned.type === type
        )
          return;
        this.scheduleHide(200);
      })
      .on("click", (evt) => {
        evt.stopPropagation();
        this.showDepartmentDetails(d);
        if (!this.showToolBadges) return;
        const same =
          this.pinned &&
          this.pinned.id === d.data.id &&
          this.pinned.type === type;
        if (same) {
          this.clearPinned();
          return;
        }
        this.pinned = { id: d.data.id, type };
        d3.selectAll(".attr-badge,.proc-badge,.task-badge").classed(
          "pinned",
          false,
        );
        d3.select(evt.currentTarget).classed("pinned", true);
        const html =
          type === "attr"
            ? this.renderFichiersHTML(nodeData)
            : type === "proc"
              ? this.renderPostesHTML(nodeData)
              : this.renderTasksHTML(nodeData);
        this.setTooltip(html, evt.currentTarget, true);
      });
  }
  renderFichiersHTML(data) {
    const items = this.getFichiersArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noDocuments")}</p>`;
    const itemsHTML = items
      .map((x) => {
        const typeLabel =
          x.type === "reglementation"
            ? this.translate("labelRegulation")
            : this.translate("labelDocument");
        const typeBadge =
          x.type === "reglementation"
            ? `<span style="color: #ef4444; font-weight: bold;">[REG]</span>`
            : `<span style="color: #16a34a; font-weight: bold;">[DOC]</span>`;
        const ref = x.ref ? ` (${x.ref})` : "";
        return `<li>${typeBadge} <strong>${x.nom}</strong>${ref}</li>`;
      })
      .join("");
    const acr = data.id || data.nom || "";
    return `<h4>${this.translate("documentsTitle")} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  }
  renderPostesHTML(data) {
    const items = this.getPostesArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noPositions")}</p>`;
    const itemsHTML = items
      .map((x) => {
        const abbr = x.abbreviation ? ` (${x.abbreviation})` : "";
        return `<li><strong>${x.nom}</strong>${abbr}</li>`;
      })
      .join("");
    const acr = data.id || data.nom || "";
    return `<h4>${this.translate("positionsTitle")} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  }
  renderTasksHTML(data) {
    const items = this.getTasksArrayFromData(data);
    if (items.length === 0) return `<p>${this.translate("noTasks")}</p>`;
    const acr = this.getAbrev(data);
    const itemsHTML = items
      .map((item) => {
        const nom = item.nom || this.translate("noName");
        const desc = item.description || "";
        return `<li><strong>${nom}</strong>${desc ? ` - ${desc}` : ""}</li>`;
      })
      .join("");
    return `<h4>${this.translate("tasksTitle")} - ${acr}</h4><ol>${itemsHTML}</ol>`;
  }
  autoFit() {
    let tries = 0,
      maxTries = 24;
    const tick = () => {
      const b = this.gRoot.node()?.getBBox?.();
      if (b && b.width > 0 && b.height > 0) {
        this.fitToScreen(80, true);
      } else if (tries++ < maxTries) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => this.fitToScreen(80, true), 220);
      }
    };
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => requestAnimationFrame(tick));
    } else {
      requestAnimationFrame(tick);
    }
  }
  fitToScreen(padding = 60, animate = false) {
    const bbox = this.gRoot.node().getBBox();
    const host = document.getElementById("chart");
    const width = host.clientWidth;
    const height = host.clientHeight;
    const scale = Math.min(
      (width - padding * 2) / bbox.width,
      (height - padding * 2) / bbox.height,
      1.2,
    );
    const transform = d3.zoomIdentity
      .translate(
        width / 2 - scale * (bbox.x + bbox.width / 2),
        height / 2 - scale * (bbox.y + bbox.height / 2),
      )
      .scale(scale);
    if (animate) {
      this.applyTransform(transform);
    } else {
      this.svg.call(this.zoom.transform, transform);
    }
    this.HOME = transform;
    this.updateScrollbars(); 
  }
  applyTransform(t, duration = 420) {
    this.svg
      .transition()
      .duration(duration)
      .ease(d3.easeCubicOut)
      .call(this.zoom.transform, t)
      .on("end", () => {
        this.updateScrollbars();
      });
  }
  handleSearch(query) {
    const node = this.findByAcr(query);
    if (node) {
      this.centerOnNode(node);
      this.highlightNode(node);
      this.showDepartmentDetails(node);
    }
  }
  findByAcr(acr) {
    const normalized = this.norm(acr);
    for (const node of this.flattenAll(this.root)) {
      if (this.norm(this.getAcr(node)) === normalized) return node;
    }
    return null;
  }
  norm(s) {
    return (s || "")
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .trim();
  }
  flattenAll(node) {
    const out = [];
    const walk = (n) => {
      out.push(n);
      (n.children || n._children || []).forEach(walk);
    };
    walk(node);
    return out;
  }
  centerOnNode(node) {
    const host = document.getElementById("chart");
    const transform = d3.zoomIdentity
      .translate(host.clientWidth / 2 - node.y, host.clientHeight / 2 - node.x)
      .scale(1.2);
    this.applyTransform(transform);
  }
  highlightNode(node) {
    this.gNodes.selectAll("g.node").classed("is-match", false);
    this.gNodes
      .selectAll("g.node")
      .filter((n) => n.data.id === node.data.id)
      .classed("is-match", true);
  }
  navigateToDepartmentFromSelect(departmentId) {
    this.navigateToDepartment(departmentId);
  }
  navigateToDepartmentFromModal(departmentId) {
    this.navigateToDepartment(departmentId);
  }
  navigateToDepartment(departmentId) {
    if (!this.root) {
      console.error(this.translate("searchError"));
      return false;
    }
    const searchRoot = this.fullRoot || this.root;
    const targetNode = this.findNodeById(searchRoot, departmentId);
    if (!targetNode) {
      console.warn(`${this.translate("departmentNotFound")} ${departmentId}`);
      return false;
    }
    const contextNode = targetNode.parent || targetNode;
    this.navigateToNode(contextNode);
    const displayedTargetNode =
      this.findNodeById(this.root, departmentId) || targetNode;
    if (!this.bModal) this.showDepartmentDetails(displayedTargetNode);
    this.highlightNode(displayedTargetNode);
    requestAnimationFrame(() => this.highlightNode(displayedTargetNode));
    setTimeout(() => this.highlightNode(displayedTargetNode), 120);
    return true;
  }
  findNodeById(startNode, id) {
    let foundNode = null;
    const search = (node) => {
      if (node.data.id === id) {
        foundNode = node;
        return true;
      }
      if (node.children) {
        for (const child of node.children) {
          if (search(child)) return true;
        }
      }
      if (node._children) {
        for (const child of node._children) {
          if (search(child)) return true;
        }
      }
      return false;
    };
    search(startNode);
    return foundNode;
  }
  expandToNode(targetNode) {
    if (!targetNode) return;
    let currentNode = targetNode;
    const pathToRoot = [];
    while (currentNode && currentNode.parent) {
      pathToRoot.unshift(currentNode.parent);
      currentNode = currentNode.parent;
    }
    pathToRoot.forEach((node) => {
      if (node._children && !node.children) {
        node.children = node._children;
        node._children = null;
      }
    });
    if (targetNode._children && !targetNode.children) {
      targetNode.children = targetNode._children;
      targetNode._children = null;
    }
  }
  navigateToDepartmentByName(nameOrAcronym) {
    const normalized = this.norm(nameOrAcronym);
    const allNodes = this.flattenAll(this.fullRoot || this.root);
    const targetNode = allNodes.find(
      (node) =>
        this.norm(node.data.data.nom) === normalized ||
        this.norm(node.data.data.id) === normalized,
    );
    if (targetNode) {
      return this.navigateToDepartment(targetNode.data.id);
    } else {
      console.warn(`${this.translate("noDepartmentFound")} ${nameOrAcronym}`);
      return false;
    }
  }
  getAllDepartments() {
    if (!this.root) return [];
    const allNodes = this.flattenAll(this.fullRoot || this.root);
    return allNodes
      .map((node) => ({
        id: node.data.id,
        nom: node.data.data.nom,
        type: node.data.data.type,
        acronyme: node.data.data.id,
      }))
      .filter((dept) => dept.id !== "root");
  }
  navigateAndIsolate(departmentId) {
    if (!this.root) return false;
    return this.navigateToDepartment(departmentId);
  }
  collapseAll() {
    if (!this.root) return;
    this.root.descendants().forEach((d) => {
      if (d.depth > 0) {
        d._children = d.children;
        d.children = null;
      }
    });
    this.update(this.root);
  }
  expandAll() {
    if (!this.root) return;
    this.root.descendants().forEach((d) => {
      if (d._children) {
        d.children = d._children;
        d._children = null;
      }
    });
    this.update(this.root);
  }
  clearDiagramme() {
    this.svg?.on(".zoom", null);
    this.tooltip?.on("mouseenter", null);
    this.tooltip?.on("mouseleave", null);
    if (this.scrollbar.container) {
      this.scrollbar.container.remove();
    }
    window.removeEventListener("resize", () => {
      this.updateScrollbars();
    });
    if (this.svg) {
      this.svg.selectAll("*").remove();
      this.svg.remove();
    }
    if (this.tooltip) {
      this.tooltip.remove();
    }
    this.svg = null;
    this.gRoot = null;
    this.gAscendants = null;
    this.gMainTree = null;
    this.gLinksHalo = null;
    this.gLinks = null;
    this.gNodes = null;
    this.zoom = null;
    this.tooltip = null;
    this.root = null;
    this.fullRoot = null;
    this.currentRootNode = null;
    this.selectedNode = null;
    this.pinned = null;
    this.activeAnchorEl = null;
    this.scrollbar = {
      x: null,
      y: null,
      container: null,
      zoomBtn: null,
      zoomOutBtn: null,
      fitBtn: null,
      expandAllBtn: null,
      collapseAllBtn: null,
      toggleBtn: null,
      isDraggingX: false,
      isDraggingY: false,
      isCollapsed: false,
    };
    this.cancelHideTimer();
    const host = document.getElementById("main-container-diagramme");
    if (host) {
      host.innerHTML = "";
    }
  }
}
